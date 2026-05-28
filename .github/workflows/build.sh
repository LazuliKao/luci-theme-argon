#!/bin/sh
# build.sh - Runs inside OpenWrt SDK container
# Mount points:
#   /builder/bin/  - Package sources (from host)
#   /builder/      - SDK root

set -e

SDK_DIR=/builder

echo "=== OpenWrt SDK Package Build ==="
echo "SDK directory: $SDK_DIR"

cd "$SDK_DIR"
test -f feeds.conf.default || { echo "ERROR: feeds.conf.default not found in $SDK_DIR"; ls -la; exit 1; }
# Fix feeds to use GitHub mirror (faster)
sed -i 's/git\.openwrt\.org\/project\/luci/github\.com\/openwrt\/luci/g' ./feeds.conf.default
sed -i 's/git\.openwrt\.org\/project\/feeds/github\.com\/openwrt\/feeds/g' ./feeds.conf.default

# Update & install LuCI feeds
echo ">>> Updating feeds..."
./scripts/feeds update luci
./scripts/feeds install luci

# Copy package sources into SDK package tree
echo ">>> Installing package sources..."
for pkg_dir in /builder/bin/*/; do
  pkg_name=$(basename "$pkg_dir")
  echo "    -> $pkg_name"
  cp -r "$pkg_dir" "./package/$pkg_name"
  chmod 755 -R "./package/$pkg_name"
done

# Configure
echo ">>> Running defconfig..."
make defconfig

# Build all four packages
echo ">>> Building packages..."
make -j$(nproc) V=s BUILD_LOG=1 \
  package/luci-theme-fluent/compile \
  package/luci-theme-argon/compile \
  package/luci-app-fluent-config/compile \
  package/luci-app-argon-config/compile

# Copy built ipk files back to bin/
echo ">>> Collecting ipk files..."
find bin -name "*.ipk" -exec cp {} /builder/bin/ \;

echo "=== Build complete ==="
ls -lh /builder/bin/*.ipk 2>/dev/null || echo "Warning: no ipk files found"
