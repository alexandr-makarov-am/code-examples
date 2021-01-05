package com.example.trackme_location;

import android.Manifest;
import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;


public class TrackMeLocationModule extends ReactContextBaseJavaModule {

    public static final String AUTH_KEY = "APP_AUTH_KEY";
    private Context context;
    private SharedPreferences sharedPreferences;

    public TrackMeLocationModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(context);
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<>();

        constants.put("userId", sharedPreferences.getString(AUTH_KEY, ""));
        constants.put("locale",  Locale.getDefault().getLanguage());

        return constants;
    }

    @ReactMethod
    public void startLocationService() {
        if (!isMyServiceRunning(LocationService.class)) {
            Intent intent = new Intent(context, LocationService.class);
            context.startService(intent);
        }else{
            Log.i("TrackMe", "The service already started");
        }
    }

    @ReactMethod
    public void saveAuthorization(String data) {
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(AUTH_KEY, data);
        editor.apply();
    }

    @ReactMethod
    public void getAuthorization(Promise promise) {
        String data = sharedPreferences.getString(AUTH_KEY, "");
        promise.resolve(data);
    }

    @NonNull
    @Override
    public String getName() {
        return "TrackMeLocation";
    }

    private boolean isMyServiceRunning(Class<?> serviceClass) {
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                return true;
            }
        }
        return false;
    }
}

