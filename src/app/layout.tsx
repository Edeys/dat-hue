import type { Metadata } from "next"
import "./globals.css"

const SITE_URL = "https://dattruongan.com"
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"
const META_PIXEL_ID = "000000000000000"
const GOOGLE_ADS_ID = "AW-XXXXXXXXX"
const GOOGLE_ADS_CONVERSION_LABEL = "XXXXXXXXXXX"
const GTM_ID = "GTM-XXXXXXX"

export const metadata: Metadata = {
  title: "Bán Nhà Điện Biên Phủ - 279m² Trường An, Huế | Giá 5.5 Tỷ - Có Dòng Tiền 12Tr/Tháng",
  description:
    "Lô đất 279m² tại 2/13/293 Đường Điện Biên Phủ, P. Trường An, TP Huế. Nhà cấp 4 + 5 phòng trọ cho thuê full 12tr/tháng. Sổ hồng chính chủ, ô tô vào tận sân. Giá 5.5 tỷ.",
  keywords: [
    "bán đất Điện Biên Phủ Huế",
    "đất Trường An Huế",
    "nhà có dòng tiền Huế",
    "đầu tư bất động sản Huế",
    "bán nhà trọ Huế",
    "đất 279m2 Huế",
  ],
  openGraph: {
    title: "Bán Nhà Điện Biên Phủ - 279m² Trường An, Huế | Giá 5.5 Tỷ",
    description:
      "Nhà cấp 4 + 5 phòng trọ cho thuê 12tr/tháng. Sổ hồng chính chủ, ô tô vào tận sân.",
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Đất Trường An",
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Nhà Điện Biên Phủ - 279m² Trường An, Huế",
      description:
        "Nhà cấp 4 + dãy 5 phòng trọ đang cho thuê full 12tr/tháng. Sổ hồng chính chủ, ô tô vào tận sân.",
      url: SITE_URL,
      offers: {
        "@type": "Offer",
        price: "5500000000",
        priceCurrency: "VND",
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "RealEstateListing",
      name: "279m² Đất + Nhà Điện Biên Phủ - Trường An, Huế",
      description:
        "Lô đất 279m² (12x22m) tại 2/13/293 Điện Biên Phủ, Trường An, Huế. Đã có nhà cấp 4 + 5 phòng trọ cho thuê 12tr/tháng.",
      url: SITE_URL,
      image: `${SITE_URL}/images/day-tro-goc-rong.jpg`,
      offers: {
        "@type": "Offer",
        price: "5500000000",
        priceCurrency: "VND",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "2/13/293 Đường Điện Biên Phủ",
        addressLocality: "Phường Trường An",
        addressRegion: "Thừa Thiên Huế",
        addressCountry: "VN",
      },
    },
    {
      "@type": "LocalBusiness",
      name: "Đất Trường An",
      url: SITE_URL,
      telephone: "0348579065",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2/13/293 Đường Điện Biên Phủ",
        addressLocality: "Phường Trường An",
        addressRegion: "Thừa Thiên Huế",
        addressCountry: "VN",
      },
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');
gtag('config', '${GOOGLE_ADS_ID}');

!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');

document.addEventListener('click', function(e) {
  var target = e.target.closest('a[href^="tel:"], a[href*="zalo.me"]');
  if (!target) return;
  gtag('event', 'conversion', {
    send_to: '${GOOGLE_ADS_ID}/${GOOGLE_ADS_CONVERSION_LABEL}',
  });
  if (typeof fbq === 'function') {
    fbq('track', 'Lead');
  }
});
`.trim(),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
