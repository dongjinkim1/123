-- shared_results — 공유 링크 (?s=<code>) 저장용 테이블
-- Gen 3 원칙: payload jsonb 가 main, generated stored 컬럼은 조회/인덱스용
--
-- 참조 코드:
--   public/js/main-results.js (MBTSShare.save / MBTSShare.load / MBTSShare.render)
--     - save: share_code, result_type, render_data, nickname, mbti, animal_emoji,
--             animal_title, animal_desc, share_image_url, ai_result, saju_summary,
--             animal_traits, animal_rx, animal_tag, animal_key, oheng (16 필드)
--     - load: select('*').eq('share_code', code).single()
--     - 비로그인 유저도 공유 생성 가능 (user_id 는 nullable)
--
-- DDL 실행 후: main-results.js:MBTSShare.save 를 payload 기반으로 수정 필요
--   (이 DDL 실행 전까지는 공유 기능 비활성. 실행은 별도 작업.)
--
-- 주의:
--   - public.users(id) 타입에 맞춰 user_id 타입 조정 필요.
--     현 레포의 users 는 Kakao OAuth 기반이라 text 타입일 가능성 높음.
--     실제 public.users.id 타입 확인 후 이 DDL 의 user_id 타입 일치시킬 것.
--   - auth.users 가 아니라 public.users 참조 (FK 실수 방지).

CREATE TABLE IF NOT EXISTS public.shared_results (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES public.users(id) ON DELETE SET NULL,
  share_code  text NOT NULL UNIQUE,
  payload     jsonb NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),

  -- Generated stored columns (조회/인덱스용, 절대 직접 write 금지)
  result_type text GENERATED ALWAYS AS (payload->>'result_type') STORED,
  mbti        text GENERATED ALWAYS AS (payload->>'mbti')        STORED,
  nickname    text GENERATED ALWAYS AS (payload->>'nickname')    STORED
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_shared_results_share_code_lookup
  ON public.shared_results(share_code);

CREATE INDEX IF NOT EXISTS idx_shared_results_user_id
  ON public.shared_results(user_id)
  WHERE user_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_shared_results_created_at
  ON public.shared_results(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_shared_results_result_type
  ON public.shared_results(result_type)
  WHERE result_type IS NOT NULL;

-- updated_at auto-refresh trigger
CREATE OR REPLACE FUNCTION public.shared_results_touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS shared_results_touch_updated_at ON public.shared_results;
CREATE TRIGGER shared_results_touch_updated_at
  BEFORE UPDATE ON public.shared_results
  FOR EACH ROW EXECUTE FUNCTION public.shared_results_touch_updated_at();

-- RLS (권장: service_role 만 write, anon 은 share_code 로 read)
-- ALTER TABLE public.shared_results ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "public read by share_code"
--   ON public.shared_results FOR SELECT
--   USING (true);
-- (write 는 service_role 만 — 서버 API 경유)
