#!/bin/sh
# build.sh - Runs inside OpenWrt SDK container
# The openwrt/sdk image needs setup.sh to download the actual SDK first.

set -e

cd /builder

# Download SDK if not already present
if [ ! -d ./scripts ]; then
  echo ">>> Running setup.sh to download SDK..."
  ./setup.sh
fi

cd /builder/openwrt
echo "=== OpenWrt SDK Package Build ==="
echo "SDK directory: $(pwd)"

test -f feeds.conf.default || { echo "ERROR: feeds.conf.default not found"; ls -la; exit 1; }

# Fix feeds to use GitHub mirror (faster)
sed -i 's/git\.openwrt\.org\/project\/luci/github\.com\/openwrt\/luci/g' ./feeds.conf.default
sed -i 's/git\.openwrt\.org\/project\/feeds/github\.com\/openwrt\/feeds/g' ./feeds.conf.default

# Update & install LuCI feeds
echo ">>> Updating feeds..."
./scripts/feeds update luci
./scripts/feeds install luci

# Move package sources into SDK package tree
echo ">>> Installing package sources..."
for pkg_dir in ./bin/*/; do
  pkg_name=$(basename "$pkg_dir")
  echo "    -> $pkg_name"
  mv "$pkg_dir" "./package/$pkg_name"
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
find bin -name "*.ipk" -exec cp {} /builder/openwrt/bin/ ;

# Collect logs
tar -cJf /builder/openwrt/bin/logs.tar.xz logs 2>/dev/null || true

echo "=== Build complete ==="
ls -lh /builder/openwrt/bin/*.ipk 2>/dev/null || echo "Warning: no ipk files found"
