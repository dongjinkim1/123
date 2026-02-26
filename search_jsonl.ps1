$file = "C:\Users\김쪨리\.claude\projects\c--Users-----Desktop-mbts-app\2d2980f4-c57b-4f14-accc-105cdb2c1532.jsonl"
$lines = Get-Content $file -Tail 3000
$found = $false
foreach ($line in $lines) {
    if ($line -match '리뉴얼 v4') {
        $found = $true
        try {
            $obj = $line | ConvertFrom-Json
            if ($obj.type -eq 'human') {
                Write-Output "=== FOUND HUMAN MESSAGE ==="
                Write-Output ($line.Substring(0, [Math]::Min($line.Length, 50000)))
                Write-Output "=== END ==="
            }
        } catch {
            Write-Output "Parse error on matching line"
        }
    }
}
if (-not $found) {
    Write-Output "No line containing '리뉴얼 v4' found in last 3000 lines"
}
