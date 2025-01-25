import { MainBoard } from "./main";

async function App({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const id = (await params).slug;
    return (<MainBoard id={id} />);
}
export default App;
