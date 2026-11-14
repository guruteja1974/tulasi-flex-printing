import ProductionServicePage from '../../components/services/ProductionServicePage.jsx';
import { serviceConfigs } from '../../data/products/serviceConfigs.js';

export default function CommercialPrintingPage() {
  return <ProductionServicePage config={serviceConfigs.commercial} />;
}
