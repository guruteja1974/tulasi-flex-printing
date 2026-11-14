import ProductionServicePage from '../../components/services/ProductionServicePage.jsx';
import { serviceConfigs } from '../../data/products/serviceConfigs.js';

export default function FlexLargeFormatPage() {
  return <ProductionServicePage config={serviceConfigs.flex} />;
}
