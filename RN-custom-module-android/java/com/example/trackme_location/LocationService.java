package com.example.trackme_location;

import android.Manifest;
import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.IBinder;
import android.preference.PreferenceManager;
import android.util.Log;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.HashMap;
import java.util.Map;

import static com.example.trackme_location.TrackMeLocationModule.AUTH_KEY;

public class LocationService extends Service {

    private SharedPreferences sharedPreferences;
    private DatabaseReference databaseReference;

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Log.i("TrackMe", "onCreate");
        sharedPreferences = PreferenceManager.getDefaultSharedPreferences(this);
        databaseReference = FirebaseDatabase.getInstance().getReference();
        NotificationHelper notificationHelper = new NotificationHelper(this);
        Notification notification = notificationHelper.create("trackMeLocation", "yola channel", "yola channel description");
        startForeground(777, notification);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i("TrackMe", "onStartCommand");
        final LocationRequest locationRequest = new LocationRequest();
        locationRequest.setInterval(2000);
        locationRequest.setFastestInterval(1000);
        locationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        FusedLocationProviderClient fusedLocationProviderClient = new FusedLocationProviderClient(this);
        int permission = ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION);
        LocationCallback locationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                Location location = locationResult.getLastLocation();
                String userId = sharedPreferences.getString(AUTH_KEY, "");
                String data = userId + ":My location is " + location.getLatitude() + "," + location.getLongitude();
                Log.i("TrackMe", data);
                if (userId != null && userId.length() > 0) {
                    Map<String,Object> update = new HashMap<String,Object>();
                    update.put("lat", location.getLatitude());
                    update.put("lng", location.getLongitude());
                    databaseReference.child("users/"+userId).updateChildren(update);
                    Log.i("TrackMe", "Update location in firebase");
                }
            }
        };
        if (permission == PackageManager.PERMISSION_GRANTED) {
            fusedLocationProviderClient.requestLocationUpdates(locationRequest, locationCallback, null);
        }
        return START_NOT_STICKY;
    }
}
