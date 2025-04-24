import AnnouncementBar from '../../components/anouncement/announcement';
import Header from '../../components/header/header';
import BannerSection from '../../components/firstbanner/firstbanner';
import TShirtGrid from '../../components/collections/collections';
import MovableSectionWithBackgrounds from '../../components/secoendbanner/secoendbanner';
import TrendingProducts from '../../components/trendingproducts/trendingproducts';
import TraditionalTShirtSection from '../../components/productadvertisement/productadvertisement';
import WelcomePage from '../../components/welcomenote/welcomenote';
import Footer from '../../components/footer/footer';

async function Page() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <BannerSection />
      <TShirtGrid />
      <MovableSectionWithBackgrounds />
      <TrendingProducts />
      <TraditionalTShirtSection />
      <WelcomePage />
      <Footer />
    </>
  );
}

export default Page;