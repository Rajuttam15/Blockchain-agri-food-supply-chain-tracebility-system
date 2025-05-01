// frontend/src/components/Farmer/ProductForm.jsx
import { useTranslation } from 'react-i18next';

export default function ProductForm() {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    name_en: '', name_hi: '',
    origin: '',
    harvestDate: ''
  });

  const handleSubmit = async () => {
    await axios.post('/api/products', {
      ...formData,
      farmerAddress: window.ethereum.selectedAddress
    });
  };

  return (
    <div className={i18n.language === 'hi' ? 'hindi-font' : ''}>
      <input 
        placeholder={t('product_name')} 
        value={formData[`name_${i18n.language}`]}
        onChange={(e) => setFormData({...formData, [`name_${i18n.language}`]: e.target.value})}
      />
      <button onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en')}>
        {t('switch_language')}
      </button>
      <button onClick={handleSubmit}>{t('register')}</button>
    </div>
  );
}