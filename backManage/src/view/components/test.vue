<template>
  <div class="test">
    <button @click="getmac">test</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      test: '',
      myEditor: null
    }
  },
  methods: {
    getmac () {
      // eslint-disable-next-line no-undef
      var locator = new ActiveXObject('WbemScripting.SWbemLocator')
      var service = locator.ConnectServer('.')
      var properties = service.ExecQuery('select * from Win32_NetworkAdapterConfiguration where IPEnabled=True')
      // eslint-disable-next-line no-undef
      var e = new Enumerator(properties)
      // eslint-disable-next-line no-lone-blocks
      {
        var p = e.item()
        var mac = p.MACAddress
        // return mac
        console.log(mac)
      }
    },
  }
}
</script>
<style>

</style>
