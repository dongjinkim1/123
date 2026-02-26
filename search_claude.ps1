 = [Environment]::GetFolderPath('UserProfile')
 = Join-Path  '.claude'

Write-Output '=== SEARCHING ==='

 = Get-ChildItem -Path  -Filter '*.jsonl' -Recurse
foreach ( in ) {
     = Get-Content .FullName -Encoding UTF8
    for ( = 0;  -lt .Count; ++) {
        if ([] -match 'v4.*patch|me.*love.*career.*year.*future') {
            Write-Output FOUND in at line 
        }
    }
}