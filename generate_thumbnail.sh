#!/bin/bash

infile="$1"
outfile="$2"
bc="#888888"

if [ "$outfile" == "" ]; then
  outfile="$infile"
fi

#convert "$infile" \
#    -format 'roundrectangle 1,1 %[fx:w+4],%[fx:h+4] 15,15' \
#    -write info:tmp.mvg \
#    -alpha set -bordercolor none -border 2 \
#    \( +clone -alpha transparent -background none \
#       -fill white -stroke none  -strokewidth 0 -draw @tmp.mvg \) \
#    -compose DstIn -composite \
#    \( +clone  -background none \
#       -fill none -stroke "$bc"  -strokewidth 2 -draw @tmp.mvg \
#       -fill none -stroke white  -strokewidth 0 -draw @tmp.mvg \) \
#    -compose Over -composite     "$outfile"
#rm -f tmp.mvg      # Cleanup of temporary file

# From http://www.imagemagick.org/Usage/thumbnails/#rounded_border

insize=$(identify -format "%[fx:w]x%[fx:h]" "$infile")

convert "$infile" \
        -format 'roundrectangle 2,2 %[fx:w],%[fx:h] 15,15'\
        info: > tmp.mvg

convert "$infile" -border 3 -alpha transparent \
        -background none -fill white -stroke none -strokewidth 0 \
        -draw "@tmp.mvg"    tmp_mask.png
convert "$infile" -border 3 -alpha transparent \
        -background none -fill none -stroke "$bc" -strokewidth 1 \
        -draw "@tmp.mvg"    tmp_overlay.png


convert "$infile" -alpha set -bordercolor none -border 3 \
        tmp_mask.png -compose DstIn -composite \
        tmp_overlay.png -compose Over -composite \
        "$outfile"

# Cleanup of temporary files
rm -f tmp.mvg tmp_mask.png tmp_overlay.png

convert "$outfile" -fuzz 7% -trim "$outfile"

outsize=$(identify -format "%[fx:w]x%[fx:h]" "$outfile")
if [ "$outsize" != "275x170" ]; then
  echo "Warning: Expected result to be of size 275x170, but it was $outsize."
  echo "For this, the input should usually be 276x171, but it was $insize."
fi
