import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  Animated,
  Image,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

// -------------------------
// Plano de Leitura
// -------------------------
const readingPlan = [
  "Marcos 12", "Marcos 13", "Marcos 14", "Marcos 15", "Marcos 16",
  "Lucas 1", "Lucas 2", "Lucas 3", "Lucas 4", "Lucas 5", "Lucas 6", "Lucas 7", "Lucas 8", "Lucas 9", "Lucas 10",
  "Lucas 11", "Lucas 12", "Lucas 13", "Lucas 14", "Lucas 15", "Lucas 16", "Lucas 17", "Lucas 18", "Lucas 19", "Lucas 20",
  "Lucas 21", "Lucas 22", "Lucas 23", "Lucas 24",
  "João 1", "João 2", "João 3", "João 4", "João 5", "João 6", "João 7", "João 8", "João 9", "João 10",
  "João 11", "João 12", "João 13", "João 14", "João 15", "João 16", "João 17", "João 18", "João 19", "João 20", "João 21",
  "Atos 1", "Atos 2", "Atos 3", "Atos 4", "Atos 5", "Atos 6", "Atos 7", "Atos 8", "Atos 9", "Atos 10",
  "Atos 11", "Atos 12", "Atos 13", "Atos 14", "Atos 15", "Atos 16", "Atos 17", "Atos 18", "Atos 19", "Atos 20",
  "Atos 21", "Atos 22", "Atos 23", "Atos 24", "Atos 25", "Atos 26", "Atos 27", "Atos 28",
  "Romanos 1", "Romanos 2", "Romanos 3", "Romanos 4", "Romanos 5", "Romanos 6", "Romanos 7", "Romanos 8", "Romanos 9", "Romanos 10",
  "Romanos 11", "Romanos 12", "Romanos 13", "Romanos 14", "Romanos 15", "Romanos 16",
  "1 Coríntios 1", "1 Coríntios 2", "1 Coríntios 3", "1 Coríntios 4", "1 Coríntios 5", "1 Coríntios 6", "1 Coríntios 7", "1 Coríntios 8", "1 Coríntios 9", "1 Coríntios 10",
  "1 Coríntios 11", "1 Coríntios 12", "1 Coríntios 13", "1 Coríntios 14", "1 Coríntios 15", "1 Coríntios 16",
  "2 Coríntios 1", "2 Coríntios 2", "2 Coríntios 3", "2 Coríntios 4", "2 Coríntios 5", "2 Coríntios 6", "2 Coríntios 7", "2 Coríntios 8", "2 Coríntios 9", "2 Coríntios 10",
  "2 Coríntios 11", "2 Coríntios 12", "2 Coríntios 13",
  "Gálatas 1", "Gálatas 2", "Gálatas 3", "Gálatas 4", "Gálatas 5", "Gálatas 6",
  "Efésios 1", "Efésios 2", "Efésios 3", "Efésios 4", "Efésios 5", "Efésios 6",
  "Filipenses 1", "Filipenses 2", "Filipenses 3", "Filipenses 4",
  "Colossenses 1", "Colossenses 2", "Colossenses 3", "Colossenses 4",
  "1 Tessalonicenses 1", "1 Tessalonicenses 2", "1 Tessalonicenses 3", "1 Tessalonicenses 4", "1 Tessalonicenses 5",
  "2 Tessalonicenses 1", "2 Tessalonicenses 2", "2 Tessalonicenses 3",
  "1 Timóteo 1", "1 Timóteo 2", "1 Timóteo 3", "1 Timóteo 4", "1 Timóteo 5", "1 Timóteo 6",
  "2 Timóteo 1", "2 Timóteo 2", "2 Timóteo 3", "2 Timóteo 4",
  "Tito 1", "Tito 2", "Tito 3",
  "Filemom 1",
  "Hebreus 1", "Hebreus 2", "Hebreus 3", "Hebreus 4", "Hebreus 5", "Hebreus 6", "Hebreus 7", "Hebreus 8", "Hebreus 9", "Hebreus 10",
  "Hebreus 11", "Hebreus 12", "Hebreus 13",
  "Tiago 1", "Tiago 2", "Tiago 3", "Tiago 4", "Tiago 5",
  "1 Pedro 1", "1 Pedro 2", "1 Pedro 3", "1 Pedro 4", "1 Pedro 5",
  "2 Pedro 1", "2 Pedro 2", "2 Pedro 3",
  "1 João 1", "1 João 2", "1 João 3", "1 João 4", "1 João 5",
  "2 João 1",
  "3 João 1",
  "Judas 1",
  "Apocalipse 1", "Apocalipse 2", "Apocalipse 3", "Apocalipse 4", "Apocalipse 5", "Apocalipse 6", "Apocalipse 7", "Apocalipse 8", "Apocalipse 9", "Apocalipse 10",
  "Apocalipse 11", "Apocalipse 12", "Apocalipse 13", "Apocalipse 14", "Apocalipse 15", "Apocalipse 16", "Apocalipse 17", "Apocalipse 18", "Apocalipse 19", "Apocalipse 20",
  "Apocalipse 21", "Apocalipse 22"
];

// -------------------------
// Configuração do JSONBin.io
// -------------------------
const BIN_ID = "67a7b9abad19ca34f8fc4ac3";
const API_KEY = "$2a$10$ZoTdawhpXaZu5uOPXYfp3.FHxC.yXznHboqPG/PZyp.i1ackeOtWG";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// -------------------------
// Cores Base
// -------------------------
const COLORS = {
  orange: "#FF9800",
  white: "#FFFFFF",
  darkText: "#333333",
  green: "#4CAF50",
  red: "#ff4444",
 yellow: "#e6ac13",
};

// -------------------------
// Tema Personalizado
// -------------------------
const MyLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
  },
};

// -------------------------
// Tela de Login/Cadastro
// -------------------------
function LoginScreen({ navigation, appData, updateAppData }) {
  const [username, setUsername] = useState("");
  const [whats, setWhats] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (!username || !whats || !password || !birthdate || !address || !photo) {
      Alert.alert("Atenção", "Preencha todos os campos e selecione uma foto!");
      return;
    }
    setIsLoading(true);
    const newUser = {
      id: Date.now(),
      username,
      whats,
      password,
      birthdate,
      address,
      photo,
      balance: 0,
      consecutiveDays: 0,
      chapterIndex: 0,
      registrationDate: new Date().toISOString(),
    };
    const updatedUsers = [...appData.users, newUser];
    await updateAppData({
      users: updatedUsers,
      currentUser: newUser,
    });
    setIsRegistering(false);
    setUsername("");
    setPassword("");
    setIsLoading(false);
    navigation.navigate("Dashboard");
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const user = appData.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      await updateAppData({ currentUser: user });
      navigation.navigate("Dashboard");
    } else {
      Alert.alert("Erro", "Credenciais inválidas!");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 1200, useNativeDriver: true }),
    ]).start();
  }, []);

 return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
  
      <View style={styles.loginContainer}>
        <Animated.View style={[styles.loginCard, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.loginTitle}>{isRegistering ? "Crie sua Conta" : "Bem-vindo"}</Text>
          {isRegistering ? (
            <>
              <TextInput placeholder="Nome de usuário" placeholderTextColor="#999" value={username} onChangeText={setUsername} style={styles.input} />
              <TextInput placeholder="WhatsApp" placeholderTextColor="#999" value={whats} onChangeText={setWhats} style={styles.input} />
              <TextInput placeholder="Senha" placeholderTextColor="#999" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
              <TextInput placeholder="Data de nascimento" placeholderTextColor="#999" value={birthdate} onChangeText={setBirthdate} style={styles.input} />
              <TextInput placeholder="Endereço" placeholderTextColor="#999" value={address} onChangeText={setAddress} style={styles.input} />
              <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
                <Ionicons name="camera" size={24} color="white" />
                <Text style={styles.buttonText}>{photo ? "Alterar Foto" : "Escolher Foto"}</Text>
              </TouchableOpacity>
              {photo && <Image source={{ uri: photo }} style={styles.profileImage} />}
              <TouchableOpacity onPress={handleRegister} style={styles.actionButton}>
                {isLoading ? <ActivityIndicator size="small" color={COLORS.white} /> : <Text style={styles.buttonText}>Cadastrar</Text>}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput placeholder="Nome de usuário" placeholderTextColor="#999" value={username} onChangeText={setUsername} style={styles.input} />
              <TextInput placeholder="Senha" placeholderTextColor="#999" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
              <TouchableOpacity onPress={handleLogin} style={styles.actionButton}>
                {isLoading ? <ActivityIndicator size="small" color={COLORS.white} /> : <Text style={styles.buttonText}>Entrar</Text>}
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
            <Text style={styles.switchText}>{isRegistering ? "Já possui conta? Entrar" : "Não tem conta? Registre-se"}</Text>
          </TouchableOpacity>
        </Animated.View>
        </View>
    </View>
  );
}

// -------------------------
// DashboardScreen
// -------------------------
function DashboardScreen({ navigation, appData, updateAppData }) {
  const { currentUser } = appData;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1200, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();
  }, []);

  const completeChapter = async () => {
    if (!currentUser) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let diff = 1;
    if (currentUser.lastReadDate) {
      diff = Math.floor((today - new Date(currentUser.lastReadDate)) / (1000 * 60 * 60 * 24));
      if (diff < 1) {
        Alert.alert("Atenção", "Você já completou a leitura de hoje!");
        return;
      }
      if (diff > 1) {
        diff = 2;
      }
    }
    if (currentUser.chapterIndex >= readingPlan.length - 1) {
      Alert.alert("Parabéns!", "Você já concluiu o plano de leitura!");
      return;
    }
    const reward = diff === 1 ? 10 : 5;
    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance + reward,
      consecutiveDays:
        currentUser.lastReadDate &&
        Math.floor((today - new Date(currentUser.lastReadDate)) / (1000 * 60 * 60 * 24)) === 1
          ? currentUser.consecutiveDays + 1
          : 1,
      chapterIndex: currentUser.chapterIndex + 1,
      lastReadDate: today.toISOString(),
    };
    const updatedUsers = appData.users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    await updateAppData({
      users: updatedUsers,
      currentUser: updatedUser,
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Parabéns!",
        body: `Você concluiu: ${readingPlan[updatedUser.chapterIndex]} e ganhou ${reward} TeenCoins!`,
      },
      trigger: null,
    });
  };

  if (!currentUser) {
    return (
      <View style={styles.dashboardContainer}>
        <Text style={{ fontSize: 18, color: COLORS.darkText }}>Usuário não encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
     
        <View style={styles.dashboardContainer}>
        <Animated.ScrollView
          contentContainerStyle={styles.dashboardContent}
          style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}
        >
          <Text style={styles.dashboardTitle}>Olá, {currentUser.username}!</Text>
          <View style={styles.taskCard}>
            <Text style={styles.cardHeader}>Leitura do Dia</Text>
            <Text style={styles.taskText}>{readingPlan[currentUser.chapterIndex]}</Text>
            <TouchableOpacity onPress={completeChapter} style={styles.actionButton}>
              <Text style={styles.buttonText}>Completar Leitura</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rectangleContainer}>
            <Text style={styles.rectangleText}>Dias Seguidos: {currentUser.consecutiveDays}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Store")} style={styles.storeButton}>
            <Text style={styles.storeButtonText}>Saldo: {currentUser.balance} TeenCoins</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Configurações</Text>
          </TouchableOpacity>
        </Animated.ScrollView>
        </View>
    </View>
  );
}
// -------------------------
// StoreScreen
// -------------------------
function StoreScreen({ navigation, appData }) {
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(API_URL, {
        headers: { "X-Master-Key": API_KEY },
      });
      const { record } = await response.json();
      if (appData.updateAppData) {
        appData.updateAppData({
          products: record.products || [],
          purchases: record.purchases || [],
        });
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os produtos");
    }
    setRefreshing(false);
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate("ProductDetail", { product: item })}
    >
      <Image source={{ uri: item.photo }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price} TeenCoins</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
    
      <View style={styles.storeContainer}>
        <FlatList
          data={appData.products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.orange]}
            />
          }
          ListEmptyComponent={
            <Text style={styles.noProductsText}>Nenhum produto disponível</Text>
          }
        />
       </View>
    </View>
  );


// -------------------------
// ProductDetailScreen
// -------------------------
function ProductDetailScreen({ route, navigation, appData, updateAppData }) {
  const { product } = route.params;
  const { currentUser } = appData;

  const handleBuy = async () => {
    if (product.quantity <= 0) {
      Alert.alert("Esgotado", "Este produto está esgotado.");
      return;
    }
    if (currentUser.balance < product.price) {
      Alert.alert("Saldo insuficiente", "Você não tem TeenCoins suficientes.");
      return;
    }
    const updatedProducts = appData.products.map((p) =>
      p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
    );
    const newPurchase = {
      id: Date.now(),
      userId: currentUser.id,
      productId: product.id,
      date: new Date().toISOString(),
    };
    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance - product.price,
    };
    await updateAppData({
      products: updatedProducts,
      purchases: [...appData.purchases, newPurchase],
      users: appData.users.map((u) =>
        u.id === currentUser.id ? updatedUser : u
      ),
      currentUser: updatedUser,
    });
    Alert.alert("Compra realizada", `Você comprou ${product.name} por ${product.price} TeenCoins.`);
    navigation.goBack();
  };

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
    
      <View style={styles.detailContainer}>
        <Image
          source={product.photo ? { uri: product.photo } : require("./assets/default.png")}
          style={styles.detailImage}
        />
        <Text style={styles.detailName}>{product.name}</Text>
        <Text style={styles.detailInfo}>Preço: {product.price} TeenCoins</Text>
        <Text style={styles.detailInfo}>Quantidade Disponível: {product.quantity}</Text>
        <TouchableOpacity onPress={handleBuy} style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
}

// -------------------------
// UserListScreen
// -------------------------
function UserListScreen({ navigation, appData }) {
  return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
    
      <View style={styles.userListContainer}>
        <FlatList
          data={appData.users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userListItem}
              onPress={() => navigation.navigate("UserDetail", { user: item })}
            >
              <Image source={{ uri: item.photo }} style={styles.userListPhoto} />
              <View style={styles.userListInfo}>
                <Text style={styles.userListName}>{item.username}</Text>
                <Text style={styles.userListCoins}>{item.balance} TeenCoins</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={COLORS.orange} />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.noUsersText}>Nenhum usuário cadastrado</Text>
          }
        />
        </View>
    </View>
  );
}

// -------------------------
// UserDetailScreen
// -------------------------
function UserDetailScreen({ route, navigation, appData, updateAppData }) {
  const { user } = route.params;
  const [coinsToAdd, setCoinsToAdd] = useState("");
  const [coinsToRemove, setCoinsToRemove] = useState("");

  const handleAddCoins = async () => {
    const amount = parseInt(coinsToAdd);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert("Erro", "Digite um valor válido para adicionar");
      return;
    }
    const updatedUsers = appData.users.map((u) =>
      u.id === user.id ? { ...u, balance: u.balance + amount } : u
    );
    await updateAppData({
      users: updatedUsers,
      currentUser: appData.currentUser?.id === user.id ? { ...user, balance: user.balance + amount } : appData.currentUser,
    });
    setCoinsToAdd("");
    Alert.alert("Sucesso", `${amount} TeenCoins adicionados com sucesso!`);
  };

  const handleRemoveCoins = async () => {
    const amount = parseInt(coinsToRemove);
    if (isNaN(amount)) {
      Alert.alert("Erro", "Digite um valor válido para remover");
      return;
    }
    if (amount > user.balance) {
      Alert.alert("Erro", "Saldo insuficiente para remover esta quantidade");
      return;
    }
    const updatedUsers = appData.users.map((u) =>
      u.id === user.id ? { ...u, balance: u.balance - amount } : u
    );
    await updateAppData({
      users: updatedUsers,
      currentUser: appData.currentUser?.id === user.id ? { ...user, balance: user.balance - amount } : appData.currentUser,
    });
    setCoinsToRemove("");
    Alert.alert("Sucesso", `${amount} TeenCoins removidos com sucesso!`);
  };


     return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
       
      <View style={styles.userDetailContainer}>
        <Image source={{ uri: user.photo }} style={styles.userDetailPhoto} />
        <Text style={styles.userDetailName}>{user.username}</Text>
        <View style={styles.userInfoBox}>
          <Text style={styles.userInfoText}>📱 WhatsApp: {user.whats}</Text>
          <Text style={styles.userInfoText}>🎂 Data Nasc.: {user.birthdate}</Text>
          <Text style={styles.userInfoText}>🏠 Endereço: {user.address}</Text>
          <Text style={styles.userInfoText}>💰 Saldo Atual: {user.balance} TeenCoins</Text>
        </View>
        <View style={styles.coinManagement}>
          <TextInput
            placeholder="Quantidade para adicionar"
            value={coinsToAdd}
            onChangeText={setCoinsToAdd}
            keyboardType="numeric"
            style={styles.coinInput}
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={handleAddCoins} style={styles.addButton}>
            <Text style={styles.buttonText}>➕ Adicionar TeenCoins</Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Quantidade para remover"
            value={coinsToRemove}
            onChangeText={setCoinsToRemove}
            keyboardType="numeric"
            style={styles.coinInput}
            placeholderTextColor="#666"
          />
          <TouchableOpacity onPress={handleRemoveCoins} style={styles.removeButton}>
            <Text style={styles.buttonText}>➖ Remover TeenCoins</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// -------------------------
// SettingsScreen
// -------------------------
function SettingsScreen({ navigation, appData, updateAppData }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCode, setAdminCode] = useState("");

  const handleAdminMode = () => {
    if (adminCode.trim() === "6901") {
      setIsAdmin(true);
      Alert.alert("Modo Admin", "Você ativou o modo administrador.");
    } else {
      Alert.alert("Erro", "Código de admin incorreto.");
    }
  };

 return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
   
      <View style={styles.settingsContainer}>
        <Animated.ScrollView contentContainerStyle={styles.settingsContent}>
          <Text style={styles.settingsTitle}>Configurações</Text>
          <View style={styles.configCard}>
            <TextInput
              placeholder="Código Admin"
              placeholderTextColor="#666"
              value={adminCode}
              onChangeText={setAdminCode}
              style={styles.inputAdmin}
              secureTextEntry
            />
            <TouchableOpacity onPress={handleAdminMode} style={styles.adminButton}>
              <Text style={styles.adminButtonText}>Ativar Admin</Text>
            </TouchableOpacity>
          </View>
          {isAdmin && (
            <>
              <TouchableOpacity
                style={styles.manageUsersButton}
                onPress={() => navigation.navigate("UserList")}
              >
                <Ionicons name="people" size={24} color="white" />
                <Text style={styles.manageUsersButtonText}>Gerenciar Usuários</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.manageProductsButton}
                onPress={() => navigation.navigate("ManageProducts")}
              >
                <Ionicons name="cart" size={24} color="white" />
                <Text style={styles.manageProductsButtonText}>Gerenciar Produtos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.purchaseHistoryButton}
                onPress={() => navigation.navigate("PurchaseHistory")}
              >
                <Ionicons name="list" size={24} color="white" />
                <Text style={styles.purchaseHistoryButtonText}>Histórico de Compras</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.ScrollView>
       </View>
    </View>
  );
}

// -------------------------
// ManageProductsScreen
// -------------------------
function ManageProductsScreen({ navigation, appData, updateAppData }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(API_URL, {
        headers: { "X-Master-Key": API_KEY },
      });
      const { record } = await response.json();
      await updateAppData({
        products: record.products || [],
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar os produtos");
    }
    setRefreshing(false);
  };

  const handleDeleteProduct = async (productId) => {
    const updatedProducts = appData.products.filter((p) => p.id !== productId);
    await updateAppData({ products: updatedProducts });
    Alert.alert("Sucesso", "Produto removido com sucesso!");
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.photo }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price} TeenCoins</Text>
      <Text style={styles.productQuantity}>Quantidade: {item.quantity}</Text>
      <View style={styles.productActions}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProduct", { product: item })}
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeleteProduct(item.id)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

   return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
     
      <View style={styles.manageProductsContainer}>
        <FlatList
          data={appData.products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.orange]}
            />
          }
          ListEmptyComponent={
            <Text style={styles.noProductsText}>Nenhum produto disponível</Text>
          }
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("AddProduct")}
          style={styles.addProductButton}
        >
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>
       </View>
    </View>
  );
}

// -------------------------
// AddProductScreen
// -------------------------
function AddProductScreen({ navigation, appData, updateAppData }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!name || !price || !quantity || !photo) {
      Alert.alert("Atenção", "Preencha todos os campos e selecione uma foto!");
      return;
    }
    const newProduct = {
      id: Date.now(),
      name,
      price: parseInt(price),
      quantity: parseInt(quantity),
      photo,
    };
    const updatedProducts = [...appData.products, newProduct];
    await updateAppData({ products: updatedProducts });
    Alert.alert("Sucesso", "Produto adicionado com sucesso!");
    navigation.goBack();
  };

   return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
     
      <View style={styles.addProductContainer}>
        <Text style={styles.addProductTitle}>Adicionar Produto</Text>
        <TextInput
          placeholder="Nome do Produto"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Preço (TeenCoins)"
          placeholderTextColor="#999"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Quantidade"
          placeholderTextColor="#999"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>{photo ? "Alterar Foto" : "Escolher Foto"}</Text>
        </TouchableOpacity>
        {photo && <Image source={{ uri: photo }} style={styles.productImage} />}
        <TouchableOpacity onPress={handleAddProduct} style={styles.actionButton}>
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>
       </View>
    </View>
  );
}

// -------------------------
// EditProductScreen
// -------------------------
function EditProductScreen({ route, navigation, appData, updateAppData }) {
  const { product } = route.params;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [photo, setPhoto] = useState(product.photo);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleUpdateProduct = async () => {
    if (!name || !price || !quantity || !photo) {
      Alert.alert("Atenção", "Preencha todos os campos e selecione uma foto!");
      return;
    }
    const updatedProduct = {
      ...product,
      name,
      price: parseInt(price),
      quantity: parseInt(quantity),
      photo,
    };
    const updatedProducts = appData.products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    await updateAppData({ products: updatedProducts });
    Alert.alert("Sucesso", "Produto atualizado com sucesso!");
    navigation.goBack();
  };

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
    
      <View style={styles.editProductContainer}>
        <Text style={styles.editProductTitle}>Editar Produto</Text>
        <TextInput
          placeholder="Nome do Produto"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Preço (TeenCoins)"
          placeholderTextColor="#999"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Quantidade"
          placeholderTextColor="#999"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity onPress={pickImage} style={styles.photoButton}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>{photo ? "Alterar Foto" : "Escolher Foto"}</Text>
        </TouchableOpacity>
        {photo && <Image source={{ uri: photo }} style={styles.productImage} />}
        <TouchableOpacity onPress={handleUpdateProduct} style={styles.actionButton}>
          <Text style={styles.buttonText}>Atualizar Produto</Text>
        </TouchableOpacity>
       </View>
    </View>
  );
}

// -------------------------
// PurchaseHistoryScreen
// -------------------------
function PurchaseHistoryScreen({ navigation, appData }) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch(API_URL, {
        headers: { "X-Master-Key": API_KEY },
      });
      const { record } = await response.json();
      if (appData.updateAppData) {
        appData.updateAppData({
          purchases: record.purchases || [],
        });
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o histórico de compras");
    }
    setRefreshing(false);
  };

  const renderPurchase = ({ item }) => {
    const user = appData.users.find((u) => u.id === item.userId);
    const product = appData.products.find((p) => p.id === item.productId);

    return (
      <View style={styles.purchaseItem}>
        <Text style={styles.purchaseText}>
          <Text style={styles.boldText}>Usuário:</Text> {user ? user.username : "Usuário não encontrado"}
        </Text>
        <Text style={styles.purchaseText}>
          <Text style={styles.boldText}>Produto:</Text> {product ? product.name : "Produto não encontrado"}
        </Text>
        <Text style={styles.purchaseText}>
          <Text style={styles.boldText}>Quantidade:</Text> 1
        </Text>
        <Text style={styles.purchaseText}>
          <Text style={styles.boldText}>Data:</Text> {new Date(item.date).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

  return (
    <View style={styles.backgroundImage}>
      <View style={styles.container}>
    
      <View style={styles.purchaseHistoryContainer}>
        <FlatList
          data={appData.purchases}
          renderItem={renderPurchase}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[COLORS.orange]}
            />
          }
          ListEmptyComponent={
            <Text style={styles.noPurchasesText}>Nenhuma compra registrada</Text>
          }
        />
      </View>
    </View>
  );
}

// -------------------------
// Componente Principal
// -------------------------
const Stack = createStackNavigator();

export default function AppWrapper() {
  const [appData, setAppData] = useState({
    users: [],
    products: [],
    purchases: [],
    currentUser: null,
    isLoading: true,
  });

  const loadData = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "X-Master-Key": API_KEY,
          "Cache-Control": "no-cache",
        },
      });
      if (!response.ok) throw new Error("Falha ao carregar dados");
      const { record } = await response.json();
      setAppData((prev) => ({
        users: record.users || [],
        products: record.products || [],
        purchases: record.purchases || [],
        currentUser: prev.currentUser
          ? (record.users || []).find((u) => u.id === prev.currentUser.id)
          : null,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do servidor");
      setAppData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const saveData = async (data) => {
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY,
          "X-Bin-Versioning": "false",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Falha ao salvar dados");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      Alert.alert("Erro", "Não foi possível sincronizar os dados com o servidor");
    }
  };

  const updateAppData = async (newData) => {
    try {
      const updatedData = { ...appData, ...newData };
      setAppData(updatedData);
      await saveData({
        users: updatedData.users,
        products: updatedData.products,
        purchases: updatedData.purchases,
      });
      await loadData();
    } catch (error) {
      console.error("Erro na atualização:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permissão negada", "Não será possível enviar notificações.");
      }
      await loadData();
      const interval = setInterval(loadData, 60000);
      return () => clearInterval(interval);
    };
    initialize();
  }, []);

  if (appData.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.orange} />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={MyLightTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.orange },
          headerTintColor: COLORS.white,
          headerTitleStyle: { fontWeight: "600" },
        }}
      >
        <Stack.Screen name="Login">
          {(props) => (
            <LoginScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Dashboard">
          {(props) => (
            <DashboardScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Store">
          {(props) => (
            <StoreScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Settings">
          {(props) => (
            <SettingsScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="ProductDetail">
          {(props) => (
            <ProductDetailScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="UserList">
          {(props) => (
            <UserListScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="UserDetail">
          {(props) => (
            <UserDetailScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="ManageProducts">
          {(props) => (
            <ManageProductsScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddProduct">
          {(props) => (
            <AddProductScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="EditProduct">
          {(props) => (
            <EditProductScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
        <Stack.Screen name="PurchaseHistory">
          {(props) => (
            <PurchaseHistoryScreen {...props} appData={appData} updateAppData={updateAppData} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// -------------------------
// Estilos
// -------------------------
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: COLORS.yellow, // Adicione esta linha
    // Remova estas propriedades:
    // resizeMode: "cover",
    // justifyContent: "center",
  },
});
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxWidth: 400,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.darkText,
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  actionButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  switchText: {
    color: COLORS.orange,
    textAlign: "center",
  },
  photoButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 10,
  },
  dashboardContainer: {
    flex: 1,
    padding: 20,
  },
  dashboardContent: {
    alignItems: "center",
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkText,
    marginBottom: 20,
  },
  taskCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20,
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.darkText,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    color: COLORS.darkText,
    marginBottom: 20,
  },
  rectangleContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20,
  },
  rectangleText: {
    fontSize: 16,
    color: COLORS.darkText,
  },
  storeButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  storeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  settingsButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  settingsButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  storeContainer: {
    flex: 1,
    padding: 10,
  },
  productsList: {
    justifyContent: "center",
  },
  productItem: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    margin: 5,
    width: "45%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.darkText,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: COLORS.darkText,
  },
  noProductsText: {
    fontSize: 16,
    color: COLORS.darkText,
    textAlign: "center",
    marginTop: 20,
  },
  detailContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  detailImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkText,
    marginBottom: 10,
  },
  detailInfo: {
    fontSize: 16,
    color: COLORS.darkText,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buyButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  userListContainer: {
    flex: 1,
    padding: 10,
  },
  userListItem: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  userListPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userListInfo: {
    flex: 1,
  },
  userListName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.darkText,
  },
  userListCoins: {
    fontSize: 14,
    color: COLORS.darkText,
  },
  noUsersText: {
    fontSize: 16,
    color: COLORS.darkText,
    textAlign: "center",
    marginTop: 20,
  },
  userDetailContainer: {
    flex: 1,
    padding: 20,
  },
  userDetailPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  userDetailName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkText,
    textAlign: "center",
    marginBottom: 20,
  },
  userInfoBox: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 16,
    color: COLORS.darkText,
    marginBottom: 10,
  },
  coinManagement: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  coinInput: {
    height: 50,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  removeButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  settingsContainer: {
    flex: 1,
    padding: 20,
  },
  settingsContent: {
    alignItems: "center",
  },
  settingsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkText,
    marginBottom: 20,
  },
  configCard: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 20,
  },
  inputAdmin: {
    height: 50,
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    marginVertical: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  adminButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  adminButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  manageUsersButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  manageUsersButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  manageProductsButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  manageProductsButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  purchaseHistoryButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  purchaseHistoryButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.darkText,
    marginTop: 10,
  },
  manageProductsContainer: {
    flex: 1,
    padding: 10,
  },
  addProductButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  addProductContainer: {
    flex: 1,
    padding: 20,
  },
  addProductTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkText,
    marginBottom: 20,
  },
  editProductContainer: {
    flex: 1,
    padding: 20,
  },
  editProductTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkText,
    marginBottom: 20,
  },
  productActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: COLORS.green,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  deleteButton: {
    backgroundColor: COLORS.red,
    paddingVertical: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  purchaseHistoryContainer: {
    flex: 1,
    padding: 20,
  },
  purchaseItem: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  purchaseText: {
    fontSize: 16,
    color: COLORS.darkText,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  noPurchasesText: {
    fontSize: 16,
    color: COLORS.darkText,
    textAlign: "center",
    marginTop: 20,
  },
});
