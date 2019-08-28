/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.cmc.nlms.service;

import java.util.List;
import org.cmc.nlms.dao.SettingRepository;
import org.cmc.nlms.model.Setting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author MyPC
 */
@Service
public class SettingService {
	@Autowired
	private SettingRepository setting;

	public List<Setting> getAll() {
		List<Setting> obj = setting.findAll();
		return obj;
	}

	public List<Setting> getSettingByName(String groupType) {
		List<Setting> obj = setting.findSettingBygroupType(groupType);
		return obj;
	}

	public Setting getSettingById(int id) {
		try {
			Setting sl = setting.findById(id).get();
			return sl;
		} catch (java.util.NoSuchElementException e) {
			return null;
		}
	}

	public Setting updateSetting(int id, Setting sl) {
		sl.setId(id);
		sl.setDescription(sl.getDescription());
		sl.setGroupType(sl.getGroupType());
		sl.setName(sl.getName());
		sl.setValue(sl.getValue());
		sl = setting.save(sl);
		return sl;
	}

	public void deleteSetting(int id) {
		setting.deleteById(id);
	}

	public void addSetting(Setting sl) {
		setting.save(sl);
	}
	public List<String> getGroupType(){
		return setting.getGroupType();
	}
}
