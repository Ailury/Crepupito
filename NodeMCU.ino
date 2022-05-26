#include <ESP8266WiFi.h>
#include <Wire.h>
#include <FirebaseArduino.h>

#define WIFI_SSID "salanet3"
#define WIFI_PASSWORD "poonparnpann"
#define FIREBASE_HOST "plantwatering-6d1f6-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "e64eB8GlFTE5T9z2SQZswQ0jW9FYJ7nKKW2mnCe9"

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
    Wire.requestFrom(8,11);
    int i = 0;
    String s="";
    while (Wire.available()) {
      char c = Wire.read();
      s+=c;
      buffer[i]=c;
      i++;
    }
    Firebase.setString("data",s);
    if (Firebase.failed()) {
      Serial.print("setting /data failed:");
      Serial.println(Firebase.error());  
      return;
    }
    Serial.println(s);
    delay(10000);
  }
}
