import ProductionServicePage from '../../components/services/ProductionServicePage.jsx';
import { serviceConfigs } from '../../data/products/serviceConfigs.js';

export default function StructuralFabricationPage() {
  return <ProductionServicePage config={serviceConfigs.fabrication} />;
}
