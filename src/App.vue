<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
}
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  overflow-x: scroll;
  padding-right: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(#2E39BF, #252EB0);
  font-family: 'Muli', sans-serif;
  overflow-y: hidden;
}
</style>
