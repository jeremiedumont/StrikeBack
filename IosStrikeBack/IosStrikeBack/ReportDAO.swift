//
//  ReportDAO.swift
//  IosStrikeBack
//
//  Created by user164174 on 3/23/20.
//  Copyright © 2020 user164174. All rights reserved.
//

import SwiftUI
import Foundation

class ReportDAO{
    
    static func addReport(postId : String, type : String) -> Bool {
        // Prepare URL
        var currentUser =  (UIApplication.shared.delegate as! AppDelegate).currentUser
        guard let token = currentUser?.authToken else{return false}
        let preString = "https://strike-back.herokuapp.com/reports/add"
        let postString = "?token=" + token
        let url = URL(string: preString+postString)
        
        guard let requestUrl = url else { fatalError() }
        // Prepare URL Request Object
        var request = URLRequest(url: requestUrl)
        request.httpMethod = "PUT"
        let json: [String: Any] = ["postId": postId, "type": type]
        // Set HTTP Request Body
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: json)
        } catch let error {
            print(error)
        }
        let semaphore = DispatchSemaphore(value :0)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        // Perform HTTP Request
        var res : Bool = false
        let task = URLSession.shared.dataTask(with: request) { (data, response, error) in
            
            // Check for Error
            if let error = error {
                print("Error took place \(error)")
                return
            } else {
                let resp = response as? HTTPURLResponse
                res = (resp?.statusCode == 200) //true si on a bien increment le heard
                if let data = data {
                    if let jsonString = String(data: data, encoding: .utf8){
                        print(jsonString)
                    }
                }
            }
            semaphore.signal()
        }
        task.resume()
        semaphore.wait()
        
        return res
    }
    
    
}

