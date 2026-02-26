[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$userHome = [Environment]::GetFolderPath("UserProfile")
$mainFile = Get-ChildItem -Path (Join-Path $userHome ".claude\projects") -Filter "2d2980f4*.jsonl" -Recurse | Where-Object { $_.Directory.Name -match "mbts-app" -and $_.Directory.Name -notmatch "subagent" } | Select-Object -First 1
Write-Output ("File: " + $mainFile.FullName)
$stream = [System.IO.StreamReader]::new($mainFile.FullName, [System.Text.Encoding]::UTF8)
$lineNum = 0
while (-not $stream.EndOfStream) {
    $line = $stream.ReadLine()
    $lineNum++
    if ($line -match "v4" -and $line -match "patch" -and $line -match "human") {
        Write-Output ("MATCH at line " + $lineNum)
        Write-Output $line.Substring(0, [Math]::Min(1000, $line.Length))
        Write-Output "---END---"
    }
}
$stream.Close()
Write-Output ("Total lines: " + $lineNum)
