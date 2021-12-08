import { getMainLayout } from '@/components/Layouts';
import { CategoriesList } from '@/components/MainContent';


const Home = () => {
  return(
    <CategoriesList />
  );
};

Home.getLayout = getMainLayout;

export default Home;
