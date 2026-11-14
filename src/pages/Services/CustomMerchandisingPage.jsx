import ProductionServicePage from '../../components/services/ProductionServicePage.jsx';
import { serviceConfigs } from '../../data/products/serviceConfigs.js';

export default function CustomMerchandisingPage() {
  return <ProductionServicePage config={serviceConfigs.merchandising} />;
}
