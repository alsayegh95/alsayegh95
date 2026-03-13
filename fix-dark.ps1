$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx"
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw
    $content = $content -replace 'bg-white', 'bg-card'
    $content = $content -replace 'border-yellow-200', 'border-border'
    $content = $content -replace 'bg-gradient-to-br from-yellow-50 via-white to-amber-50', 'bg-card'
    $content = $content -replace 'border-emerald-400 text-emerald-600 bg-emerald-50', 'border-success text-success'
    $content = $content -replace 'border-emerald-300 text-emerald-700 bg-emerald-50', 'border-success/30 text-success bg-success/5'
    $content = $content -replace 'bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200', 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'
    $content = $content -replace 'text-emerald-600', 'text-success'
    $content = $content -replace 'text-yellow-600', 'text-yellow-400'
    $content = $content -replace 'border-stone-300 text-muted-foreground bg-stone-50', 'border-border text-muted-foreground'
    Set-Content $f.FullName $content -NoNewline
}
Write-Host "Done - fixed dark theme colors"
