import "./../styles/styles.css";
import "./../styles/home.css";
import "./../styles/products.css";
import { Shared } from "./shared";
Shared();
const getNews = async () => {
    try {
        const url = 'https://esteticagabrielagatto.com/wp-json/wp/v2/posts?_embed&per_page=5';
        const response = await fetch(url);
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.log(error);
        return false;
    }
    
}

const parsedDate = (date, lang) => {
    const event = new Date(`${date}`);
    return event.toLocaleDateString(lang);
}

const textCleaning = ({rendered}) => {
    const clean = rendered.replace(/<a\b[^>]*>(.*?)<\/a>/i, "");
    return clean;
}

const templateDrawing = ({date, _embedded, title, excerpt, link}) => {
    const lang = document.querySelector('html').getAttribute('lang');
    let published;
    let leerArt;
    let paDate;
    const textNews = textCleaning(excerpt);
    if(lang === 'es') {
        published = "Publicado";
        leerArt = "Leer Artículo";
        paDate = parsedDate(date, lang);
    } else {
        published = "Published";
        leerArt = "Read Article";
        paDate = parsedDate(date, lang);
    }
    
    const template =  `<li class="aaog-news-container">
                            <figure><img loading="lazy" src="${_embedded["wp:featuredmedia"][0]['link']}" alt=""></figure>
                            <div class="aaog-news--text-wrapper">
                                <h3><a href="">${title.rendered}</a></h3>
                                <p class="new-date">${published}: <strong>${paDate}</strong></p>
                                <p>${textNews}</p>
                                <p><a href="${link}">${leerArt} <span class="aaog-visuallyhidden">${title.rendered}</a></p>
                            </div>                        
                        </li>`;
    return template;
}

const renderNews = (news) => {
    const newsHolder = document.querySelector('#newsSection .aaog-news-wrapper');
    news.forEach(element => {
        const nw = templateDrawing(element);
        newsHolder.insertAdjacentHTML('beforeend', nw);
    });
    
}

const initHome = async () => {
    const newsWrapper = document.querySelector('#newsSection');
    document.querySelector('#loadingNews').removeAttribute('hidden');
    let news = await getNews();
    if(news.data && news.data.status === 404) {
        newsWrapper.setAttribute('hidden', true);
    }
    renderNews(news);
     
}

initHome();
   
