
(function() {
  'use strict'
  angular
    .module('app')
    .component('public', {
      controller: controller,
      templateUrl: './js/public/classifieds.html'
    })

  controller.$inject = ['adService', '$state']

  function controller(adService, $state) {
    const vm = this
    vm.$onInit = onInit
    vm.getAll = getAll
    vm.makeAd = makeAd
    vm.edit = edit
    vm.editAd = editAd
    vm.deleteAd = deleteAd

    function onInit() {
      getAll()
    }

    function getAll() {
      adService.getAd().then(classifieds => {
        vm.classifieds = classifieds
      })
    }

    function makeAd() {
      adService.plusAd(vm.post).then(post => {
      })
      delete vm.post
      $state.reload()
    }

    function edit() {
      vm.showAd = vm.showAd ? !vm.showAd : true
    }

    function editAd(post) {
      adService.editAd(post.id, vm.editP).then(item => {
        })
        $state.reload()
    }

    function deleteAd(post) {
      adService.deleteAd(post.id).then(classifieds => {
        $state.reload()
        console.log('control deleting');
      })

    }
  }
}())
