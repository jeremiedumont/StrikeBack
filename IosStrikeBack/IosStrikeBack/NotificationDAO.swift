//
//  NotificationDAO.swift
//  IosStrikeBack
//
//  Created by user164174 on 3/14/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import Foundation
import SwiftUI

public class NotificationDAO{
    static let rootURL : String = "https://strike-back.herokuapp.com/notifications/"
    
    static func deleteNotification(id : String) -> Bool{
        let currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
        // Prepare URL
        guard let token = currentUser?.authToken else{return false}
        let preString = NotificationDAO.rootURL + "delete"
        let postString = "?id="+id+"&token="+String(token)
        let url = URL(string: preString+postString)
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "DELETE"
        let semaphore = DispatchSemaphore(value :0)

        // Perform HTTP Request
        var res = false
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            if let error = error {
                print("Error took place \(error)")
                return
            }
                
                let resp = response as? HTTPURLResponse
            print("code d'erreur")
            print(resp?.statusCode)
                res = (resp?.statusCode == 200)
                
            if let data = data{
                if let jsonString = String(data: data, encoding: .utf8){
                    print(jsonString)
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
    
    static func getAllUserNotifications() -> [Notification] {
        let currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
        // Prepare URL
        guard let token = currentUser?.authToken else{return []}
        let preString = NotificationDAO.rootURL + "findByUserId"
        let postString = "?token="+String(token)
        let urlString = preString+postString
        let url = URL(string: urlString)
        guard let requestUrl = url else { fatalError() }
        print(urlString)
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "GET"
        let semaphore = DispatchSemaphore(value :0)

        // Perform HTTP Request
        var res : [Notification] = []
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
                
                // Check for Error
                if let error = error {
                    print("Error took place \(error)")
                    return
                }
            
                // Convert HTTP Response Data to a String
                if let data = data{
                    
                    do{
                        print("COUCOU C MOI")
                        res = try JSONDecoder().decode([Notification].self, from: data)
                        
                    }catch let error {
                        print(error)
                    }
                }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
}
