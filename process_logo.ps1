Add-Type -AssemblyName System.Drawing

$inputPath = "c:\Users\drofa\Documents\Projects\GoldAccesories\Imagenes\Marea Viva Logo.jpeg"
$outputFull = "c:\Users\drofa\Documents\Projects\GoldAccesories\public\images\logo-marea-viva.png"
$outputIso = "c:\Users\drofa\Documents\Projects\GoldAccesories\public\images\logo-isotipo.png"
$outputFavicon = "c:\Users\drofa\Documents\Projects\GoldAccesories\public\favicon.png"
$outputLight = "c:\Users\drofa\Documents\Projects\GoldAccesories\public\images\logo-marea-viva-light.png"

$src = [System.Drawing.Bitmap]::FromFile($inputPath)
$w = $src.Width
$h = $src.Height

# 1. Create transparent PNG of full logo
$bmpFull = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$bmpLight = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $src.GetPixel($x, $y)
        if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
            $bmpFull.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
            $bmpLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 255, 255, 255))
        } elseif ($c.R -gt 215 -and $c.G -gt 215 -and $c.B -gt 215) {
            $minVal = [Math]::Min($c.R, [Math]::Min($c.G, $c.B))
            $alpha = [int](255 * (255 - $minVal) / 40.0)
            if ($alpha -gt 255) { $alpha = 255 }
            if ($alpha -lt 0) { $alpha = 0 }
            $bmpFull.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
            # Light version: white text on dark background
            $bmpLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
        } else {
            $bmpFull.SetPixel($x, $y, $c)
            # If the pixel is dark navy (whale body or text), turn it into white/light gold for dark footer
            if ($c.R -lt 40 -and $c.G -lt 65 -and $c.B -lt 95) {
                $bmpLight.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
            } else {
                # Preserve the gold elements
                $bmpLight.SetPixel($x, $y, $c)
            }
        }
    }
}

$bmpFull.Save($outputFull, [System.Drawing.Imaging.ImageFormat]::Png)
$bmpLight.Save($outputLight, [System.Drawing.Imaging.ImageFormat]::Png)

# 2. Tight crop for Isotipo (Whale + Arc + Star)
# Calculate bounding box of the top portion (y: 0 to h*0.7)
$minX = $w
$maxX = 0
$minY = $h
$maxY = 0
$limitY = [int]($h * 0.70)

for ($y = 0; $y -lt $limitY; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $bmpFull.GetPixel($x, $y)
        if ($c.A -gt 20) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

# Add small padding
$padding = 10
$cropX = [Math]::Max(0, $minX - $padding)
$cropY = [Math]::Max(0, $minY - $padding)
$cropW = [Math]::Min($w - $cropX, ($maxX - $minX) + ($padding * 2))
$cropH = [Math]::Min($limitY - $cropY, ($maxY - $minY) + ($padding * 2))

$rectIso = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$bmpIsoCropped = $bmpFull.Clone($rectIso, $bmpFull.PixelFormat)
$bmpIsoCropped.Save($outputIso, [System.Drawing.Imaging.ImageFormat]::Png)

# 3. Create square favicon with padding
$favSize = 128
$favBmp = New-Object System.Drawing.Bitmap($favSize, $favSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($favBmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality

$scale = [Math]::Min(($favSize - 16) / $cropW, ($favSize - 16) / $cropH)
$drawW = [int]($cropW * $scale)
$drawH = [int]($cropH * $scale)
$drawX = [int](($favSize - $drawW) / 2)
$drawY = [int](($favSize - $drawH) / 2)

$g.DrawImage($bmpIsoCropped, $drawX, $drawY, $drawW, $drawH)
$g.Dispose()
$favBmp.Save($outputFavicon, [System.Drawing.Imaging.ImageFormat]::Png)

Write-Host "Success! Created: logo-marea-viva.png, logo-marea-viva-light.png, logo-isotipo.png, favicon.png"

$src.Dispose()
$bmpFull.Dispose()
$bmpLight.Dispose()
$bmpIsoCropped.Dispose()
$favBmp.Dispose()
