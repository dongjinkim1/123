 = 'C:\Users\김쪨리\.claude\projects\c--Users-----Desktop-mbts-app\2d2980f4-c57b-4f14-accc-105cdb2c1532.jsonl'
 = [System.IO.StreamReader]::new(, [System.Text.Encoding]::UTF8)
 = New-Object System.Collections.Generic.List[string]
while ( -ne ( = .ReadLine())) {
    .Add()
}
.Close()
 = .Count
Write-Output "Total lines: "
 = [Math]::Max(0,  - 3000)
 = 
for ( = ;  -lt ; ++) {
     = []
    if (.Contains([char]0xB9A4 + [string][char]0xB274 + [char]0xC5BC + ' v4')) {
        Write-Output "Found match at line "
         = 
    }
}
if (-not ) {
    Write-Output "Not found in last 3000 lines, searching all lines..."
    for ( = 0;  -lt ; ++) {
         = []
        if (.Contains([char]0xB9AC + [string][char]0xB274 + [char]0xC5BC + ' v4')) {
            Write-Output "Found match at line "
             = 
        }
    }
}
if (-not ) { Write-Output "Still not found" }