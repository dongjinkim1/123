[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
 = [Environment]::GetFolderPath("UserProfile")
 = Get-ChildItem -Path (Join-Path  '.claude\projects') -Filter '2d2980f4*.jsonl' -Recurse | Where-Object { extglob.Directory.Name -match 'mbts-app' -and extglob.Directory.Name -notmatch 'subagent' } | Select-Object -First 1
Write-Output ("File: " + .FullName)
Write-Output ("Size: " + [math]::Round(.Length/1KB,1) + "KB")
 = [System.IO.StreamReader]::new(.FullName, [System.Text.Encoding]::UTF8)
 = 0
 = @()
while (-not .EndOfStream) {
     = .ReadLine()
    ++
    if ( -match 'v4' -and  -match 'patch' -and  -match 'human') {
         += 
        Write-Output ("MATCH at line " +  + ": " + .Substring(0, [Math]::Min(500, .Length)))
    }
}
.Close()
Write-Output ("Total lines scanned: " + )
Write-Output ("Matches found: " + .Count)
