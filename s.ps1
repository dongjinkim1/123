[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
 = Join-Path :USERPROFILE '.claude\projects\c--Users-----Desktop-mbts-app\2d2980f4-c57b-4f14-accc-105cdb2c1532.jsonl'
Write-Output "File: "
Write-Output "Exists: "
 = [System.IO.File]::OpenRead()
.Seek(-20000000, [System.IO.SeekOrigin]::End) | Out-Null
 = [System.IO.StreamReader]::new(, [System.Text.Encoding]::UTF8)
 = .ReadLine()
 = 0
while ( -ne ( = .ReadLine())) {
    ++
    if (.Contains('MBTS') -and .Contains('v4')) {
        Write-Output "MATCH at line  (length=):"
        Write-Output .Substring(0, [Math]::Min(.Length, 500))
        Write-Output '---END PREVIEW---'
    }
}
.Close()
Write-Output "Scanned  lines"
