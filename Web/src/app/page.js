import Style from './page.module.css';
import HomeInicial from './homeInicial/page';

export default function Home() {
  return (
    <div className={Style.container}>
      <HomeInicial/>
      
    </div>
  );
}
