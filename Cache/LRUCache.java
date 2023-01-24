package cache;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

public class LRUCache <T> {
	private int capacity = 100;
	private Map<String, T> map = Collections.synchronizedMap(new LinkedHashMap<String, T>());
	
	public boolean containsKey(String key) {
		return map.containsKey(key);
	}
	
	public int getCapacity() {
		return capacity;
	}
	
	public void add(String key, T item) {
		map.put(key, item);
		if (map.size() > capacity) {
			map.remove(map.keySet().iterator().next());
		}
	}
	
	public T get(String key) {
		if (map.containsKey(key)) {
			map.put(key, map.get(key));
		}
		return map.get(key);
	}
}
