import { Category, Product } from "../../sanity.types";
import  {CategorySelectorComponent} from "./CategorySelectorComponent";
import ProductGrid from "./ProductGrid";

interface IProductsViewProps {
    products: Product[];
    categories: Category[];
}
const ProductsView = ({ products, categories }: IProductsViewProps) => {
    return (
        <div className="flex flex-col">
            {/* categories section */}
            <div className="w-full sm:w-[200px]">
                <CategorySelectorComponent categories={categories} />
            </div>
            {/* products section */}
            <div className="flex-1">
                <div>
                    <ProductGrid products={products} />
                    <hr className="w-1/2 sm:w-3/4" />
                </div>
            </div>
        </div>
    )
}

export default ProductsView;
