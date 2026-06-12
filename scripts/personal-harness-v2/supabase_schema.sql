-- personal-harness-v2 패턴 테이블 (② §6 — 적용은 동진, P3: 미적용이어도 비차단·로컬 정본)
-- pending_upload.jsonl 보류분을 사후 일괄 적재하는 대상 스키마.
create table if not exists harness2_patterns (
  id text primary key,              -- H2-{subj코드}-{seq} (C16 네임스페이스)
  subject text not null,            -- premium 14키 원문
  tags jsonb not null,              -- 최종 태그 (2~4)
  name text not null,               -- 패턴 제목 1줄 (C12)
  mechanism text not null,          -- 주장 본문
  scene text,                       -- 장식 (매칭·주장 0 관여)
  falsify text not null,            -- 반증 조건 (필수)
  format text,                      -- 형식 5종 | 파생
  order_id text,                    -- 주문서 id
  support integer,                  -- 채택 시점 최종 tags 기준 보유자 수
  tier text check (tier in ('S','A','B')),  -- 적재 컷 C18
  impact integer check (impact between 1 and 10),  -- C9 (arbiter 부여)
  variations jsonb,
  model text,                       -- 전 역할 claude-fable-5 (C22)
  transport text,                   -- cc | api
  family_id text,                   -- 파생군 루트 (파생=부모 id, 일반=선채택 id, 기존 풀 루트 가능 — C15)
  derived_from text,                -- 부모 id (원본 null)
  sweep_axis text,                  -- strength|cf|kts|dwss|sess|yongshin_el
  falsify_verified boolean default false,  -- 파생군 전멸 시 역기록 (D11 §7)
  created_at timestamptz default now()
);
create index if not exists idx_h2p_subject on harness2_patterns(subject);
create index if not exists idx_h2p_family on harness2_patterns(family_id);
