<template>
  <header class="page-hd">
    <router-link :to="{name:'root'}" class="btn-nav page-logo">
      <img src="~@/assets/img/f_logo.svg" alt=""> DASHBOARD
    </router-link>
    <button class="btn btn-nav" type="button" @click="goBack">
      <Icon type="arrow-left-c"/>
      返回
    </button>
    <div class="pull-right">
      <Menu mode="horizontal" theme="light" @on-select="menuSelected">
        <Submenu name="user">
          <template slot="title">
            <Icon type="person"/>
            用户名
          </template>
          <MenuItem name="logout">
            <Icon type="ios-information-outline"/>
            退出登录
          </MenuItem>
        </Submenu>
      </Menu>
    </div>
  </header>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showMenu: false
      };
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      menuSelected(name) {
        if (name === 'logout') {
          console.log('退出登录');
          this.$router.push({name: 'login'});
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    mounted() {
      this.load();
    }
  };
</script>

<style type="text/less" lang="less" scoped>
  @import (less) "~@/css/vars.less";

  .nav {
    border: none;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    border-left: 1px solid #eee;
    .MX-flex-vertical;
    cursor: pointer;
    &.open {
      .nav-submenu {
        display: block;
      }
    }
    &-submenu {
      position: absolute;
      border: 1px solid #eee;
      display: none;
      top: 100%;
      z-index: 2;
      right: 0;
      &-item {
        background: #fff;
        border-bottom: 1px solid #eee;
        width: auto;
      }
    }
  }
</style>
