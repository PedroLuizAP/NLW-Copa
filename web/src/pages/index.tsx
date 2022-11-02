import Image from "next/image";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import userAvatarExampleImg from "../assets/users-avatar-example.png"
import iconCheckImg from "../assets/icon-check.svg"

export default function Home(props) {

  return (
    <div>
      <main>
        <Image src={logoImg} alt="NLW Copa" quality={100}></Image>

        <h1>Crie seu próprio bolão da copa e compatilhe entre amigos</h1>

        <div>
          <Image src={userAvatarExampleImg} alt="Avata Example" quality={100}></Image>
          <strong><span>+77777</span>pessoa já estão usando</strong>
        </div>

        <form>
          <input type="text" required placeholder="Qual nome do seu bolão?" />
          <button type="submit"> Criar meu bolão</button>
        </form>

        <p>Após criar seu bolão você receberá um código único que poderá usar para convidar seus amigos 🚀</p>

        <div>
          <div>
            <Image src={iconCheckImg} alt="Check" quality={100}></Image>
            <div>
              <span>+777</span>
              <span>Bolões criados</span>
            </div>
          </div>
         
          <div>
            <Image src={iconCheckImg} alt="Check" quality={100}></Image>
            <div>
              <span>+777</span>
              <span>Bolões criados</span>
            </div>
          </div>
          
        </div>
      </main>

      <Image src={appPreviewImg} alt="Dois Celulares" quality={100}></Image>
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const response = await fetch("http://localhost:3333/pools/count");

//   const data = await response.json();

//   console.log(data);

//   return {
//     props: {
//       count: data.count,
//     }
//   }
// }