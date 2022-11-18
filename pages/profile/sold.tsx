import Item from "../../components/item";
import Layout from "../../components/layout";

export default function Sold() {
  return (
    <Layout canGoBack title="판매내역">
      <div className="flex flex-col space-y-5 py-10">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            key={i}
            id={i}
            title="iPhone 14"
            price={120}
            comments={3}
            hearts={21}
          />
        ))}
      </div>
    </Layout>
  );
}
