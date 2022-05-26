#include <ESP8266WiFi.h>
#include <Wire.h>
#include <FirebaseArduino.h>

#define WIFI_SSID "salanet3"
#define WIFI_PASSWORD "poonparnpann"
#define FIREBASE_HOST "plantwatering-6d1f6-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "e64eB8GlFTE5T9z2SQZswQ0jW9FYJ7nKKW2mnCe9"

float airhumid;
float temp;
float soilhumid;

/*
void i2ctransmit(int address,String massage) {
  // msg len
  Wire.beginTransmission(address);
  Wire.write(strlen(massage));
  Wire.endTransmission(address);
  // msg
  Wire.beginTransmission(address);
  Wire.write(strlen(massage));
  Wire.endTransmission(address);
}
*/

void readData() {
  int i=0; char tmp[4];
  Wire.requestFrom(8,12);
  while (Wire.available()) {
    tmp[i%4]= Wire.read();
    if (i==3) {
      temp = atof(tmp);
    }
    else if (i==7) {
      airhumid = atof(tmp);
    }
    else if (i==11) {
      soilhumid = atof(tmp);
    }
    i++;
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("");
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  // setup i2c
  Wire.begin(); 
  // setup firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

char buffer[100];

void loop() {
  if (WiFi.status() == WL_CONNECTED){
    readData();
    Serial.println("read data completed");
    Firebase.setFloat("airhumid",airhumid);
    if (Firebase.failed()) {
      Serial.print("setting /airhumid failed:");
      Serial.println(Firebase.error());  
      return;
    }
    Firebase.setFloat("soilhumid",soilhumid);
    if (Firebase.failed()) {
      Serial.print("setting /soilhumid failed:");
      Serial.println(Firebase.error());  
      return;
    }
    Firebase.setFloat("temp",temp);
    if (Firebase.failed()) {
      Serial.print("setting /temp failed:");
      Serial.println(Firebase.error());  
      return;
    }
    delay(10000);
  }
}
