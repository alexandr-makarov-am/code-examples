package com.example.trackme_location;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import androidx.core.app.NotificationCompat;

public class NotificationHelper {

    private Context context;

    public NotificationHelper(Context context)
    {
        this.context = context;
    }

    public Notification create(String channelId, String channelName, String channelDescription)
    {
        Intent notificationIntent = new Intent(context, getMainActivityClass(context));
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, notificationIntent, 0);
        return new NotificationCompat.Builder(context, createNotificationChannel(channelName, channelDescription, channelId))
                .setOngoing(true)
                .setPriority(Notification.PRIORITY_DEFAULT)
                .setContentIntent(pendingIntent)
                .setContentTitle("This app uses GPS")
                .setContentText("Application gets your gps coordinates. Don't stop the process.")
                .setSmallIcon(R.drawable.common_google_signin_btn_icon_dark)
                .build();
    }

    private String createNotificationChannel(String name, String description, String channelId) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(channelId, name, importance);
            channel.setDescription(description);
            NotificationManager notificationManager = (NotificationManager)context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
        return channelId;
    }

    private Class getMainActivityClass(Context context) {
        String packageName = context.getPackageName();
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(packageName);
        if (launchIntent == null || launchIntent.getComponent() == null) {
            Log.e("NotificationHelper", "Failed to get launch intent or component");
            return null;
        }
        try {
            return Class.forName(launchIntent.getComponent().getClassName());
        } catch (ClassNotFoundException e) {
            Log.e("NotificationHelper", "Failed to get main activity class");
            return null;
        }
    }

}
