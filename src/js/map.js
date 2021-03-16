function mapInit() {
    let flag = 0
    const LOADING_OFFSET = 500

    function showMap() {
        const scrollY = window.scrollY
        const mapOffset = document.querySelector('#map').getBoundingClientRect().top

        if ((scrollY >= mapOffset - LOADING_OFFSET) && (flag === 0)) {
            ymaps.ready(init);
            function init() {
                const myMap = new ymaps.Map("map", {

                    center: [34.869497, -111.760186],

                    zoom: 10
                });

                myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
                    hintContent: 'Седона'
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/projects/Sedona/img/map-marker.png',
                    iconImageSize: [27, 27],
                    iconImageOffset: [-12, -20]
                })

                myMap.geoObjects
                    .add(myPlacemark)
            }

            flag = 1
        }
    }

    showMap()

    window.addEventListener('scroll', () => {
        showMap()
    })
}

mapInit()