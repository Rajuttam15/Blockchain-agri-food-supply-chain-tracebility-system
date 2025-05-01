// MobileApp/components/QRScanner.js
import QRCodeScanner from 'react-native-qrcode-scanner';

function Scanner({ navigation }) {
  const onSuccess = (e) => {
    fetch(`http://your-backend/api/products/${e.data}`)
      .then(res => res.json())
      .then(data => navigation.navigate('ProductDetails', { product: data }));
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      reactivate={true}
      showMarker={true}
      bottomContent={
        <Text style={styles.text}>Scan product QR code</Text>
      }
    />
  );
}