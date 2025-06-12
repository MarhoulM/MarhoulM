import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import ProductCard from "./Components/ProductCard";
import Footer from "./Components/Footer";
import Basket from "./Components/Basket";
import Profile from "./Components/Profile";
import Contact from "./Components/Contact";
import Checkout from "./Components/Checkout";
import ThankYou from "./Components/ThankYou";
import ProductDetail from "./Components/ProductDetail";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";

const items = [
  {
    id: 1,
    name: "Hovězí Jerky Klasik",
    price: 280,
    currency: "Kč",
    imageUrl: "https://placehold.co/250x200/B0BEC5/263238?text=Jerky+Klasik",
    description: "Tradiční hovězí jerky, jemně kořeněné, sušené do křupava.",
    category: "Hovězí",
    detailDescription: {
      meatType: "Libové hovězí maso (zadní, roštěnec)",
      process:
        "Maso je nakrájeno na tenké plátky, marinováno v naší tajné směsi koření (česnek, cibule, pepř, paprika) po dobu 24 hodin a poté pomalu sušeno při nízké teplotě po dobu 8-12 hodin pro optimální křupavost a zachování živin.",
      weight: "50g balení",
      nutrition: "Vysoký obsah bílkovin (cca 40g na balení), nízký obsah tuku.",
      origin: "Česká republika",
      shelfLife:
        "Spotřebujte do 6 měsíců od data výroby. Skladujte v suchu a chladu.",
    },
  },
  {
    id: 2,
    name: "Vepřové Jerky Pikantní",
    price: 260,
    currency: "Kč",
    imageUrl: "https://placehold.co/250x200/FFAB91/BF360C?text=Jerky+Pikant",
    description:
      "Pikantní vepřové maso s chilli a uzenou paprikou, pro milovníky ostrých chutí.",
    category: "Vepřové",
    detailDescription: {
      meatType: "Libové vepřové maso (kýta)",
      process:
        "Plátky vepřového masa jsou naloženy do marinády s výběrovým chilli (např. Habanero, Kajenský pepř) a uzenou paprikou. Následně se maso suší po dobu 10-14 hodin, aby se rozvinula plná pikantní chuť s kouřovým podtónem.",
      weight: "50g balení",
      nutrition:
        "Bohaté na bílkoviny, dodává energii. Obsahuje přírodní antioxidanty z papriky.",
      origin: "Česká republika",
      shelfLife:
        "Spotřebujte do 6 měsíců od data výroby. Skladujte v suchu a chladu.",
    },
  },
  {
    id: 3,
    name: "Kuřecí Strips Sladké Chilli",
    price: 220,
    currency: "Kč",
    imageUrl: "https://placehold.co/250x200/FFF176/F57F17?text=Strips+Chilli",
    description: "Lehké kuřecí maso s exotickou sladko-chilli marinádou.",
    category: "Kuřecí",
    detailDescription: {
      meatType: "Kuřecí prsní řízky",
      process:
        "Kuřecí strips jsou marinované ve sladko-chilli omáčce s nádechem zázvoru a limetky. Sušení probíhá kratší dobu (6-10 hodin) pro zachování jemnosti masa.",
      weight: "40g balení",
      nutrition:
        "Velmi libové maso, nízký obsah tuku, ideální pro sportovce. Lehce stravitelné.",
      origin: "Česká republika",
      shelfLife:
        "Spotřebujte do 5 měsíců od data výroby. Skladujte v suchu a chladu.",
    },
  },
  {
    id: 4,
    name: "Sušené Hovězí Maso s Pepřem",
    price: 290,
    currency: "Kč",
    imageUrl: "https://placehold.co/250x200/9FA8DA/303F9F?text=Hovězí+s+pepřem",
    description: "Kousky prémiového hovězího s čerstvě mletým černým pepřem.",
    category: "Hovězí",
    detailDescription: {
      meatType: "Kvalitní hovězí svíčková",
      process:
        "Vybrané kousky svíčkové jsou ručně obaleny v hrubě mletém černém pepři a po krátké marinaci sušeny po dobu 12-16 hodin, aby se pepřová chuť plně propojila s masem.",
      weight: "50g balení",
      nutrition:
        "Vysoce kvalitní bílkoviny, bohaté na železo a zinek. Pepř podporuje trávení.",
      origin: "Česká republika",
      shelfLife:
        "Spotřebujte do 6 měsíců od data výroby. Skladujte v suchu a chladu.",
    },
  },
  {
    id: 5,
    name: "Sušené Vepřové Maso s Česnekem",
    price: 270,
    currency: "Kč",
    imageUrl:
      "https://placehold.co/250x200/C5E1A5/33691E?text=Vepřové+s+česnekem",
    description: "Intenzivní chuť česneku a bylinek na vepřovém mase.",
    category: "Vepřové",
    detailDescription: {
      meatType: "Vepřová panenka",
      process:
        "Jemné plátky vepřové panenky jsou marinované v česnekové pastě s provensálskými bylinkami (rozmarýn, tymián, oregano). Sušení probíhá 10-12 hodin, čímž vznikne aromatická a plná chuť.",
      weight: "50g balení",
      nutrition:
        "Zdroj kvalitních bílkovin. Česnek je známý pro své prospěšné účinky.",
      origin: "Česká republika",
      shelfLife:
        "Spotřebujte do 6 měsíců od data výroby. Skladujte v suchu a chladu.",
    },
  },
  {
    id: 6,
    name: "Sušené Krůtí Maso Teriyaki",
    price: 240,
    currency: "Kč",
    imageUrl: "https://placehold.co/250x200/B2DFDB/00695C?text=Krůtí+Teriyaki",
    description:
      "Jemné krůtí maso s typickou sladko-slanou teriyaki marinádou.",
    category: "Kuřecí",
    detailDescription: {
      meatType: "Krůtí prsní řízky",
      process:
        "Krůtí maso je nakrájeno na strips a marinováno v autentické teriyaki omáčce (sójová omáčka, mirin, sake, zázvor, česnek). Sušení trvá 7-11 hodin, maso zůstává jemné a šťavnaté.",
      weight: "45g balení",
      nutrition:
        "Velmi nízký obsah tuku a vysoký obsah bílkovin, ideální pro fitness.",
      origin: "Česká republika",
      shelfLife:
        "Spotřebujte do 5 měsíců od data výroby. Skladujte v suchu a chladu.",
    },
  },
  {
    id: 7,
    name: "Hovězí Jerky Extra Pálivé",
    price: 300,
    currency: "Kč",
    imageUrl: "https://placehold.co/250x200/EF9A9A/D32F2F?text=Extra+Pálivé",
    description: "Pro ty, kteří se nebojí výzvy! Opravdu pálivé hovězí jerky.",
    category: "Hovězí",
    detailDescription: {
      meatType: "Libové hovězí maso (zadní)",
      process:
        "Plátky hovězího masa jsou naloženy do extrémně pálivé marinády s Jolokií a Scorpion papričkami. Sušení probíhá 10-14 hodin, aby se ostrá chuť dokonale propojila s masem. **Upozornění: Velmi pálivé!**",
      weight: "45g balení",
      nutrition:
        "Vysoký obsah bílkovin. Kapsaicin v chilli papričkách může zrychlit metabolismus.",
      origin: "Česká republika",
      shelfLife:
        "Spotřebujte do 6 měsíců od data výroby. Skladujte v suchu a chladu.",
    },
  },
  {
    id: 8,
    name: "Mix Sušených Masíček",
    price: 350,
    currency: "Kč",
    imageUrl: "https://placehold.co/250x200/FFCC80/E65100?text=Mix+Masíček",
    description:
      "Výběr toho nejlepšího z naší nabídky sušených mas, ideální na ochutnávku.",
    category: "Mix",
    detailDescription: {
      meatType: "Kombinace hovězího, vepřového a kuřecího masa.",
      process:
        "Mix obsahuje vybrané kousky z našich nejoblíbenějších druhů jerky. Každý typ masa je marinován a sušen dle vlastních specifikací, aby byla zachována jeho unikátní chuť a textura.",
      weight: "70g balení (různé poměry mas)",
      nutrition:
        "Komplexní zdroj bílkovin z různých druhů masa. Pestrá paleta chutí.",
      origin: "Česká republika",
      shelfLife:
        "Spotřebujte do 6 měsíců od data výroby. Skladujte v suchu a chladu.",
    },
  },
  {
    id: 9,
    name: "Sušená Zvěřina s Bylinkami",
    price: 380,
    currency: "Kč",
    imageUrl: "https://placehold.co/250x200/CFD8DC/546E7A?text=Zvěřina",
    description:
      "Exkluzivní sušené maso z divočiny s aromatickými lesními bylinkami.",
    category: "Zvěřina",
    detailDescription: {
      meatType: "Kvalitní zvěřina (např. jelen, divočák)",
      process:
        "Maso ze zvěřiny je pečlivě vybráno a marinováno v bohaté směsi lesních bylinek (jalovec, tymián, rozmarýn) a červeného vína. Pomalé sušení po dobu 14-18 hodin zvýrazňuje jeho specifickou a bohatou chuť.",
      weight: "50g balení",
      nutrition:
        "Velmi libové maso, bohaté na bílkoviny a minerály. Autentická chuť divočiny.",
      origin: "Česká republika (s důrazem na udržitelné zdroje)",
      shelfLife:
        "Spotřebujte do 6 měsíců od data výroby. Skladujte v suchu a chladu.",
    },
  },
  {
    id: 10,
    name: "Sušené Hovězí Maso Sriracha",
    price: 295,
    currency: "Kč",
    imageUrl: "https://placehold.co/250x200/FFCDD2/D50000?text=Sriracha",
    description:
      "Hovězí maso s oblíbenou pálivou omáčkou Sriracha pro pikantní zážitek.",
    category: "Hovězí",
    detailDescription: {
      meatType: "Libové hovězí maso (zadní)",
      process:
        "Hovězí plátky jsou marinovány v autentické Sriracha omáčce s česnekem a trochou cukru. Proces sušení (10-12 hodin) zajišťuje, že se pálivá a mírně sladká chuť Srirachi dokonale vstřebá do masa.",
      weight: "50g balení",
      nutrition:
        "Vysoký podíl bílkovin, dodává energii. Výrazná chuť, která probudí chuťové pohárky.",
      origin: "Česká republika",
      shelfLife:
        "Spotřebujte do 6 měsíců od data výroby. Skladujte v suchu a chladu.",
    },
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category &&
        product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSearchBtn = (currentSearchTerm) => {
    setSearchTerm(currentSearchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <AuthProvider>
        <Router>
          <div>
            <Navbar
              onSearch={setSearchTerm}
              searchTerm={searchTerm}
              onSearchSubmit={handleSearchBtn}
              onClearSearch={handleClearSearch}
            />
            <div className="product-card-wrapper">
              <Routes>
                <Route
                  path="/"
                  element={<ProductCard products={filteredItems} />}
                />
                <Route
                  path="/products"
                  element={<ProductCard products={filteredItems} />}
                />
                <Route
                  path="/products/:productId"
                  element={<ProductDetail allProducts={items} />}
                />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route
                  path="*"
                  element={<ProductCard products={filteredItems} />}
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
