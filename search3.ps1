[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
 = 'C:\Users\김쪨리\.claude\projects\c--Users-----Desktop-mbts-app\2d2980f4-c57b-4f14-accc-105cdb2c1532.jsonl'
 = [System.IO.File]::OpenRead()
.Seek(-5000000, [System.IO.SeekOrigin]::End) | Out-Null
 = [System.IO.StreamReader]::new(, [System.Text.Encoding]::UTF8)
 = .ReadLine()
 = 0
 = @()
while ( -ne ( = .ReadLine())) {
    ++
    if (.Contains('v4')) {
        if (.Contains('MBTS')) {
             += 
            Write-Output "MATCH at relative line  (first 300 chars):"
            Write-Output .Substring(0, [Math]::Min(.Length, 300))
            Write-Output "---"
        }
    }
}
.Close()
Write-Output "Total lines scanned: , matches: "