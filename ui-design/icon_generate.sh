#!/bin/bash

generate() {
    icon_name=$1
    tmp_dir="${icon_name}.iconset"

    mkdir ./${tmp_dir}

    sips -z 16 16 ${icon_name}.png --out ${tmp_dir}/icon_16x16.png
    sips -z 32 32 ${icon_name}.png --out ${tmp_dir}/icon_16x16@2x.png
    sips -z 32 32 ${icon_name}.png --out ${tmp_dir}/icon_32x32.png
    sips -z 64 64 ${icon_name}.png --out ${tmp_dir}/icon_32x32@2x.png
    sips -z 64 64 ${icon_name}.png --out ${tmp_dir}/icon_64x64.png
    sips -z 128 128 ${icon_name}.png --out ${tmp_dir}/icon_64x64@2x.png
    sips -z 128 128 ${icon_name}.png --out ${tmp_dir}/icon_128x128.png
    sips -z 256 256 ${icon_name}.png --out ${tmp_dir}/icon_128x128@2x.png
    sips -z 256 256 ${icon_name}.png --out ${tmp_dir}/icon_256x256.png
    sips -z 512 512 ${icon_name}.png --out ${tmp_dir}/icon_256x256@2x.png
    sips -z 512 512 ${icon_name}.png --out ${tmp_dir}/icon_512x512.png

    iconutil -c icns ./${tmp_dir}/

    magick convert ./${tmp_dir}/* ${icon_name}.ico
}

generate icon-dark

generate icon-white

exit 0
