let search =
    document.
        querySelector('.busca').
        addEventListener('submit', async (event) => {
            event.preventDefault();

            let input = document.querySelector('#searchInput').value;

            if (input !== '') {
                clearInfor()
                showWarning('Carregando...');

                let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=889294cb9d01ca5fcfd359ac75f9a471&units=metric&lang=pt_br`;

                let results = await fetch(url);
                let json = await results.json();

                if (json.cod === 200) {
                    showInfo({
                        title: json.name,
                        country: json.sys.country,
                        temp: json.main.temp,
                        tempIcon: json.weather[0].icon,
                        speed: json.wind.speed,
                        vDeg: json.wind.deg
                    });
                } else {
                    clearInfor()
                    showWarning('Não encontramos esta localização.');
                }
            }
        });

function showInfo(json) {
    showWarning('');

    let resultado = document.querySelector('.resultado');
    let title = document.querySelector('.titulo');
    let temp = document.querySelector('.tempInfo');
    let icon = document.querySelector('.temp img');
    let vento = document.querySelector('.ventoInfo');
    let ventoPonto = document.querySelector('.ventoPonto');

    title.innerHTML = `${json.title}, ${json.country}`;
    temp.innerHTML = `${json.temp} <sup>ºC</sup>`;
    icon.src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    vento.innerHTML = `${json.speed} <span>km/h</span>`;
    ventoPonto.style.transform = `rotate(${json.vDeg - 90}deg)`

    resultado.style.display = 'block';
}

function clearInfor() {
    showWarning('')
    let resultado = document.querySelector('.resultado');
    resultado.style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso')
        .innerHTML = (msg);
}
