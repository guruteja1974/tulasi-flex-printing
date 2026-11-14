import ProductionServicePage from '../../components/services/ProductionServicePage.jsx';
import { serviceConfigs } from '../../data/products/serviceConfigs.js';

export default function ArchitecturalSignagePage() {
  return <ProductionServicePage config={serviceConfigs.signage} />;
}
