include $(TOPDIR)/rules.mk

PKG_NAME:=luci-app-fluent-config
PKG_VERSION:=1.0
PKG_RELEASE:=20260528

PKG_MAINTAINER:=Sisyphus

LUCI_TITLE:=LuCI app for FluentUI theme configuration
LUCI_PKGARCH:=all
LUCI_DEPENDS:=+luci-theme-fluent

define Package/$(PKG_NAME)/conffiles
/etc/config/fluent
/www/luci-static/fluent/background
endef

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
