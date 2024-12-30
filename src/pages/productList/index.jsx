import { useContext } from "react";
import { ShoppingCartContext } from "../../context";
import ProductTile from "../../componenets/productTile";

function ProductListPage() {
  const { listofProducts,loading } = useContext(ShoppingCartContext);
  console.log(listofProducts);
  if(loading) return <h2>Please wait a moment</h2>
  return (
    <div>
      {/* return{" "} */}
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-3xl font-extralight text-gray-950 sm:text-4xl">
              Our Feature Product
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-10 lg:gap-8 lg:grid-cols-4">
            {listofProducts && listofProducts.length > 0 ? (
              listofProducts.map(singleproductTile => <ProductTile singleproductTile={singleproductTile}/>)
            ) : (
              <h2>No Product Found</h2>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductListPage;
