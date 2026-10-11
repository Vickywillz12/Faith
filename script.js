const galleryImages = [
  {file:'98752.jpg',title:'Students gathered for a school activity',category:'students'},
  {file:'98751.jpg',title:'Community guests at an academy event',category:'community'},
  {file:'98754.jpg',title:'Participants at a school programme',category:'events'},
  {file:'98733.jpg',title:'Faith Academy crest',category:'school-info'},
  {file:'98750.jpg',title:'School community at a celebration',category:'events'},
  {file:'98755.jpg',title:'Stage and school event setting',category:'events'},
  {file:'98732.png',title:'School gathering photograph',category:'students'},
  {file:'98753.jpg',title:'Guests and participants at an event',category:'community'},
  {file:'98734.jpg',title:'Faith Academy admissions information poster',category:'school-info'},
  {file:'98735.jpg',title:'Academy building and grounds',category:'campus'},
  {file:'98736.jpg',title:'Students in school uniforms',category:'students'},
  {file:'98737.jpg',title:'Students taking part in an indoor activity',category:'students'},
  {file:'98738.jpg',title:'Roadside view near the school area',category:'campus'},
  {file:'98739.jpg',title:'Exterior view of the school surroundings',category:'campus'},
  {file:'98740.jpg',title:'School building exterior',category:'campus'},
  {file:'98741.jpg',title:'Campus courtyard and buildings',category:'campus'},
  {file:'98742.jpg',title:'School building and landscaped grounds',category:'campus'},
  {file:'98743.jpg',title:'Campus walkway and classroom blocks',category:'campus'},
  {file:'98744.jpg',title:'Open field on campus',category:'campus'},
  {file:'98745.jpg',title:'Classroom block and front grounds',category:'campus'},
  {file:'98746.jpg',title:'Refreshments prepared for a school event',category:'community'},
  {file:'98747.jpg',title:'Refreshments at a community gathering',category:'community'},
  {file:'98748.jpg',title:'Participants sharing refreshments at an event',category:'community'},
  {file:'98749.jpg',title:'School community group photograph',category:'events'},
  {file:'98756.jpg',title:'Students taking part in an outreach activity',category:'community'},
  {file:'98757.jpg',title:'Students and visitors during a community activity',category:'community'},
  {file:'98758.jpg',title:'Students participating in a school activity',category:'students'},
  {file:'98759.jpg',title:'Graduation or award presentation',category:'events'},
  {file:'98760.jpg',title:'Graduation celebration',category:'events'},
  {file:'98761.jpg',title:'Graduates and school community',category:'events'},
  {file:'98762.jpg',title:'Speaker at a school celebration',category:'events'},
  {file:'98763.jpg',title:'Presentation during a graduation celebration',category:'events'},
  {file:'98764.jpg',title:'Graduates gathered on stage',category:'events'},
  {file:'98783.jpg',title:'Welcome event group photograph',category:'events'},
  {file:'98787.jpg',title:'Group at a welcome event',category:'events'},
  {file:'98788.jpg',title:'Students displaying their work outdoors',category:'students'}
];
const gallery = document.getElementById('gallery-grid');
const filter = document.getElementById('gallery-filter');
const count = document.getElementById('gallery-count');
let visibleImages = [...galleryImages];
let currentIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption');
function renderGallery(){
  const value = filter.value;
  visibleImages = galleryImages.filter(item => value === 'all' || item.category === value);
  gallery.innerHTML = '';
  visibleImages.forEach((item,index)=>{
    const fig = document.createElement('figure');
    fig.className = 'gallery-item'; fig.tabIndex = 0; fig.setAttribute('role','button'); fig.setAttribute('aria-label',`Open photo: ${item.title}`);
    const img = document.createElement('img'); img.src = `assets/images/${item.file}`; img.alt = item.title; img.loading = 'lazy';
    img.onerror = function(){this.onerror=null;this.alt=`Photo unavailable: ${item.title}`;this.style.objectFit='contain';this.style.padding='16px';this.style.background='#e8edf4';this.src='assets/images/98733.jpg';};
    const cap = document.createElement('figcaption'); cap.textContent = item.title;
    fig.append(img,cap);
    fig.addEventListener('click',()=>openLightbox(index));
    fig.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLightbox(index);}});
    gallery.appendChild(fig);
  });
  count.textContent = `${visibleImages.length} photograph${visibleImages.length===1?'':'s'}`;
}
function openLightbox(index){currentIndex=index;updateLightbox();lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';lightbox.querySelector('.lightbox-close').focus();}
function updateLightbox(){const item=visibleImages[currentIndex];if(!item)return;lightboxImage.src=`assets/images/${item.file}`;lightboxImage.alt=item.title;lightboxCaption.textContent=item.title;}
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');document.body.style.overflow='';}
function moveLightbox(delta){currentIndex=(currentIndex+delta+visibleImages.length)%visibleImages.length;updateLightbox();}
filter.addEventListener('change',renderGallery);
lightbox.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.querySelector('.lightbox-prev').addEventListener('click',()=>moveLightbox(-1));
lightbox.querySelector('.lightbox-next').addEventListener('click',()=>moveLightbox(1));
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('open'))return;if(e.key==='Escape')closeLightbox();if(e.key==='ArrowLeft')moveLightbox(-1);if(e.key==='ArrowRight')moveLightbox(1);});
const toggle=document.querySelector('.menu-toggle');const nav=document.getElementById('main-nav');
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}));
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('enquiry-form').addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget;const data=new FormData(form);const subject=encodeURIComponent(`Faith Academy Eket — ${data.get('type')} enquiry`);const body=encodeURIComponent(`Name: ${data.get('name')}\nPhone: ${data.get('phone')}\nEmail: ${data.get('email')||'Not provided'}\nEnquiry type: ${data.get('type')}\n\nMessage:\n${data.get('message')}`);document.getElementById('form-note').textContent='Your email app should open with the enquiry prepared. Please check the recipient address with the academy before sending.';window.location.href=`mailto:?subject=${subject}&body=${body}`;});
renderGallery();
