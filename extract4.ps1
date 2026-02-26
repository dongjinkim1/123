[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$mainFile = "C:\Users\김쪨리\.claude\projects\c--Users-----Desktop-mbts-app\2d2980f4-c57b-4f14-accc-105cdb2c1532.jsonl"
$stream = [System.IO.StreamReader]::new($mainFile, [System.Text.Encoding]::UTF8)
$lineNum = 0
while (-not $stream.EndOfStream) {
    $line = $stream.ReadLine()
    $lineNum++
    if ($lineNum -ge 4455 -and $lineNum -le 4465) {
        Write-Output ("=== LINE " + $lineNum + " (first 2000 chars) ===")
        Write-Output $line.Substring(0, [Math]::Min(2000, $line.Length))
        Write-Output ""
    }
}
$stream.Close()
