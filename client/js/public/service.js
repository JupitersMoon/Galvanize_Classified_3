
(function() {

  angular.module('app')
    .service('adService',  service)

    service.$inject = ['$http']
    function service($http) {
      const sv = this
      sv.getAd = getAd
      sv.plusAd = plusAd
      sv.editAd = editAd
      sv.deleteAd = deleteAd

      function getAd(id) {
        return $http.get(id ? `/api/classifieds/${id}` : '/api/classifieds').then((classifieds) => {
          return classifieds.data
        })
      }

      function plusAd(post) {
        return $http.post('/api/classifieds', post).then((classifieds) => {
          return classifieds.data
        })
      }

      function editAd(id, classified) {
        return $http.patch(`/api/classifieds/${id}`, classified).then((classifieds) => {
          return classifieds.data
        })
      }

      function deleteAd(id) {
        return $http.delete(`/api/classifieds/${id}`).then((classifieds) => {
          // return $http.delete(`/api/classifieds/${id}`);
          console.log('service delete ad');
          return classifieds.data
        })
      }
  }

}())
