<template>
  <nav class="page-menu">
    <button class="btn btn-toggle" @click="toggleMenu"><i class="fa fa-navicon"></i></button>
    <Menu theme="dark"
          width="auto"
          :accordion="false"
          class="menu"
          :active-name="''"
          :open-names="openItem">
      <template v-for="(item,index) in menu">
        <template v-if="item.hasOwnProperty('children')">
          <Submenu :name="index+''">
            <template slot="title">
              <i :class="`fa fa-${item.icon}`"></i>
              <span class="menu-item-text">{{item.title}}</span>
            </template>
            <template v-for="(child,subIndex) in item.children">
              <MenuItem :name="`${index}-${subIndex}`" class="menu-item">
                <template v-if="!!child.to">
                  <router-link class="menu-link" :to="child.to" active-class="active">{{child.title}}</router-link>
                </template>
                <template v-else>
                  <a :href="child.href" target="_blank" class="menu-link">{{child.title}}</a>
                </template>
              </MenuItem>
            </template>
          </Submenu>
        </template>
        <template v-else>
          <MenuItem :name="index" class="menu-item">
            <router-link class="menu-link" :to="item.to" active-class="active">
              <i :class="`fa fa-${item.icon}`"></i>
              <span class="menu-item-text">{{item.title}}</span>
            </router-link>
          </MenuItem>
        </template>
      </template>
    </Menu>
  </nav>
</template>
<script>
  import _ from 'lodash';
  import navData from '@/const/nav.json';

  export default {
    computed: {
      openItem() {
        const {menu, $route, $router} = this;
        const pathRegex = new RegExp(`^${$route.path}`);
        const matchIndex = _.findIndex(menu, item => _.find(item.children, child =>
          pathRegex.test($router.resolve(child.to).route.path)));

        return [`${matchIndex >= 0 ? matchIndex : 1}`];
      },
      menu() {
        return navData;
      }
    },
    methods: {
      toggleMenu() {
        const isToggled = document.body.classList.contains('fold-menu');
        document.body.classList[isToggled ? 'remove' : 'add']('fold-menu');
        localStorage.setItem('menu-toggled', !isToggled);
      }
    },
    mounted() {
      const isFoldLastTime = localStorage.getItem('menu-toggled');
      if (isFoldLastTime === 'true') {
        document.body.classList.add('fold-menu');
      }
    }
  };
</script>

<style type="text/less" lang="less" scoped>
  @import (less) "~@/css/vars.less";

  .btn-toggle {
    width: 100%;
    border: none;
    display: block;
    outline: none;
    color: #fff;
    cursor: pointer;
    background: lighten(#495060, 4%);
    height: 30px;
    transition: background-color .2s linear;
    &:hover {
      background: darken(#495060, 4%);
    }
  }
</style>
